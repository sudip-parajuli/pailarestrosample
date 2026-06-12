'use client'
/**
 * BurnTransition.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * WebGL fragment shader that recreates the Shopify Winter '26 / Framer University
 * burn transition effect — organic torn fire edge with bloom glow, driven by
 * a 0→1 progress value.
 *
 * Usage:
 *   <BurnTransition progress={0.0} />   // fully covering (entering)
 *   <BurnTransition progress={1.0} />   // fully revealed (exiting)
 *
 * For page transitions, mount this over the page and animate progress 0→1
 * on route change via the usePageTransition hook.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'

interface BurnTransitionProps {
  /** 0 = fully covered (black), 1 = fully revealed */
  progress: number
  /** Base color of the burn overlay — defaults to Paila ember */
  color?: [number, number, number]
  /** Edge glow color — defaults to copper */
  edgeColor?: [number, number, number]
  /** Noise scale — lower = larger tears, higher = finer grain */
  noiseScale?: number
  /** Edge thickness in noise space */
  edgeWidth?: number
  /** Bloom glow intensity */
  bloom?: number
}

// ─── GLSL Shaders ────────────────────────────────────────────────────────────

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAG = `
  precision mediump float;

  uniform vec2  u_resolution;
  uniform float u_progress;   // 0.0 = fully covered, 1.0 = fully clear
  uniform vec3  u_color;      // base overlay color
  uniform vec3  u_edge;       // bloom/edge glow color
  uniform float u_scale;      // noise scale
  uniform float u_edge_width; // edge feather width
  uniform float u_bloom;      // glow intensity
  uniform float u_time;       // subtle animation time

  // ── Permutation hash ──────────────────────────────────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  // ── Simplex noise 2D ──────────────────────────────────────────────────────
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ── Fractal noise (4 octaves) ─────────────────────────────────────────────
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  shift = vec2(100.0);
    mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p  = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Flip Y so progress burns from bottom to top (natural fire direction)
    float y = 1.0 - uv.y;

    // Subtle time-based horizontal drift in the noise (organic feel)
    vec2 noiseUV = uv * u_scale + vec2(u_time * 0.04, 0.0);

    // Two layers of noise for more complex edge
    float n1 = fbm(noiseUV);
    float n2 = fbm(noiseUV * 1.8 + vec2(3.7, 1.3));
    float noise = n1 * 0.7 + n2 * 0.3;

    // Normalise noise to 0-1
    float n = noise * 0.5 + 0.5;

    // The burn threshold — progress pushes the "clear" line upward
    // Map progress (0→1) to threshold (1→0) so 0=covered, 1=clear
    float threshold = 1.0 - u_progress;

    // Distance from edge (negative = covered, positive = revealed)
    float dist = n + y - threshold * 2.0;

    // Sharp edge for the burn line
    float burnEdge = 1.0 - smoothstep(-u_edge_width, 0.0, dist);

    // Revealed region (alpha = 0 = transparent)
    float coverAlpha = 1.0 - smoothstep(0.0, u_edge_width * 0.5, dist);

    // Bloom glow around the torn edge
    float glow = exp(-abs(dist) * (8.0 / u_edge_width)) * u_bloom;
    glow *= burnEdge + 0.3;

    // Composite: base color + edge glow
    vec3 col = mix(u_color, u_edge, burnEdge * 0.9 + glow);
    float alpha = max(coverAlpha, glow * 0.85);

    gl_FragColor = vec4(col, alpha);
  }
`

// ─── Shader helpers ───────────────────────────────────────────────────────────

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[BurnTransition] Shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const v = createShader(gl, gl.VERTEX_SHADER, vert)
  const f = createShader(gl, gl.FRAGMENT_SHADER, frag)
  if (!v || !f) return null
  const prog = gl.createProgram()!
  gl.attachShader(prog, v)
  gl.attachShader(prog, f)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[BurnTransition] Program link error:', gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BurnTransition({
  progress,
  color     = [0.11, 0.039, 0.0],   // #1C0A00 ember
  edgeColor = [0.769, 0.384, 0.176], // #C4622D copper
  noiseScale  = 2.8,
  edgeWidth   = 0.18,
  bloom       = 1.4,
}: BurnTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef     = useRef<WebGLRenderingContext | null>(null)
  const progRef   = useRef<WebGLProgram | null>(null)
  const rafRef    = useRef<number>(0)
  const startTime = useRef(performance.now())

  // Init WebGL once
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) { console.warn('[BurnTransition] WebGL not supported'); return }

    glRef.current = gl
    const prog = createProgram(gl, VERT, FRAG)
    if (!prog) return
    progRef.current = prog

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.useProgram(prog)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      glRef.current?.viewport(0, 0, canvas.width, canvas.height)
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Render loop — updates on progress or time
  useEffect(() => {
    const gl   = glRef.current
    const prog = progRef.current
    const canvas = canvasRef.current
    if (!gl || !prog || !canvas) return

    cancelAnimationFrame(rafRef.current)

    const render = () => {
      const t = (performance.now() - startTime.current) / 1000

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), canvas.width, canvas.height)
      gl.uniform1f(gl.getUniformLocation(prog, 'u_progress'),   progress)
      gl.uniform3fv(gl.getUniformLocation(prog, 'u_color'),     color)
      gl.uniform3fv(gl.getUniformLocation(prog, 'u_edge'),      edgeColor)
      gl.uniform1f(gl.getUniformLocation(prog, 'u_scale'),      noiseScale)
      gl.uniform1f(gl.getUniformLocation(prog, 'u_edge_width'), edgeWidth)
      gl.uniform1f(gl.getUniformLocation(prog, 'u_bloom'),      bloom)
      gl.uniform1f(gl.getUniformLocation(prog, 'u_time'),       t)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      // Keep animating slightly so the edge feels alive (subtle flicker)
      if (progress > 0.02 && progress < 0.98) {
        rafRef.current = requestAnimationFrame(render)
      }
    }

    render()
    return () => cancelAnimationFrame(rafRef.current)
  }, [progress, color, edgeColor, noiseScale, edgeWidth, bloom])

  // Hide canvas via CSS opacity when fully revealed (progress === 1) so it remains mounted and pre-compiled in memory
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[99998] w-full h-full pointer-events-none transition-opacity duration-200 ${
        progress >= 1 ? 'opacity-0 invisible' : 'opacity-100'
      }`}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
