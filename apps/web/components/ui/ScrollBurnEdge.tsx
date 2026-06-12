'use client'
/**
 * ScrollBurnEdge.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * THE SHOPIFY EFFECT — reproduced for Next.js.
 *
 * This component sits at the BOTTOM of a section. As the user scrolls,
 * the fire edge burns across the canvas revealing the next section below.
 *
 * HOW IT WORKS:
 *   - Canvas is position:sticky at the bottom of a tall scroll container
 *   - useScroll maps container scrollYProgress (0→1) to shader progress
 *   - At progress=0: full ember overlay covers the canvas (section hidden)
 *   - At progress=1: canvas is clear, next section fully revealed
 *   - The organic fire edge is the torn boundary in between
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'

// ─── GLSL ─────────────────────────────────────────────────────────────────────

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_progress;   // 0=covered, 1=revealed
uniform vec3  u_color;      // overlay base color
uniform vec3  u_edge;       // fire glow color
uniform float u_scale;
uniform float u_ew;         // edge width
uniform float u_bloom;
uniform float u_time;
uniform int   u_direction;  // 0=bottom-up, 1=top-down

vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289v2(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289v3(((x*34.)+1.)*x);}

float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289v2(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m; m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

float fbm(vec2 p){
  float v=0.; float a=.5;
  vec2 shift=vec2(100.);
  mat2 rot=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));
  for(int i=0;i<5;i++){v+=a*snoise(p);p=rot*p*2.1+shift;a*=.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;

  // Direction: 0=fire eats from top revealing bottom, 1=fire eats from bottom
  float axis = (u_direction == 0) ? uv.y : (1.0 - uv.y);

  // Slow horizontal drift keeps edge alive while still
  vec2 nuv = uv * u_scale + vec2(u_time * 0.035, u_time * 0.008);
  float n1 = fbm(nuv);
  float n2 = fbm(nuv * 1.6 + vec2(4.1, 2.3));
  float n3 = fbm(nuv * 0.7 - vec2(1.8, 3.1));
  float noise = n1*0.55 + n2*0.3 + n3*0.15;
  float n = noise * 0.5 + 0.5; // 0-1

  // progress drives the threshold: 0=all covered, 1=all clear
  float threshold = 1.0 - u_progress;
  float dist = n + axis - threshold * 2.0;

  float burnEdge = 1.0 - smoothstep(-u_ew, 0.0, dist);
  float coverAlpha = 1.0 - smoothstep(0.0, u_ew * 0.4, dist);

  // Glow: exponential falloff from edge
  float glow = exp(-abs(dist) * (7.0 / max(u_ew, 0.01))) * u_bloom;
  glow *= burnEdge + 0.25;

  // Inner fire: secondary glow slightly inside the edge
  float innerGlow = exp(-max(dist, 0.0) * (14.0 / max(u_ew, 0.01))) * u_bloom * 0.6;

  vec3 col = u_color;
  col = mix(col, u_edge * 1.4, burnEdge * 0.95);         // torn edge → copper
  col = mix(col, vec3(1.0, 0.85, 0.3), burnEdge * 0.35); // hot core → yellow
  col += u_edge * innerGlow;

  float alpha = max(coverAlpha, (glow + innerGlow) * 0.9);
  alpha = clamp(alpha, 0.0, 1.0);

  // At full progress, render nothing
  if (u_progress >= 0.99) { gl_FragColor = vec4(0.0); return; }

  gl_FragColor = vec4(col, alpha);
}
`

// ─── WebGL helpers ────────────────────────────────────────────────────────────

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
  if (!gl) return null

  const mkShader = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src); gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('[ScrollBurnEdge]', gl.getShaderInfoLog(s)); return null
    }
    return s
  }
  const v = mkShader(gl.VERTEX_SHADER, VERT)
  const f = mkShader(gl.FRAGMENT_SHADER, FRAG)
  if (!v || !f) return null

  const prog = gl.createProgram()!
  gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[ScrollBurnEdge]', gl.getProgramInfoLog(prog)); return null
  }

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  gl.useProgram(prog)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  return { gl, prog }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ScrollBurnEdgeProps {
  /** 0–1 scroll progress driving the burn. Can be a number or a MotionValue. */
  progress: number | MotionValue<number>
  /** height of canvas in px — the "burn zone" height */
  height?: number
  /** 0 = burns downward (reveals bottom), 1 = burns upward */
  direction?: 0 | 1
  color?: [number, number, number]
  edgeColor?: [number, number, number]
  noiseScale?: number
  edgeWidth?: number
  bloom?: number
  className?: string
}

export default function ScrollBurnEdge({
  progress,
  height = 220,
  direction = 0,
  color     = [0.11, 0.039, 0.0],
  edgeColor = [0.769, 0.384, 0.176],
  noiseScale  = 2.4,
  edgeWidth   = 0.22,
  bloom       = 1.8,
  className   = '',
}: ScrollBurnEdgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef     = useRef<ReturnType<typeof initGL>>(null)
  const rafRef    = useRef<number>(0)
  const t0        = useRef(performance.now())
  const progRef   = useRef(0)

  // Track progress of MotionValue or number without triggering React renders
  useEffect(() => {
    if (typeof progress === 'number') {
      progRef.current = progress
    } else if (progress && 'get' in progress) {
      progRef.current = progress.get()
      const unsubscribe = progress.on('change', (latest) => {
        progRef.current = latest
      })
      return () => unsubscribe()
    }
  }, [progress])

  // Init GL once
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    glRef.current = initGL(canvas)

    const ro = new ResizeObserver(() => {
      if (!glRef.current) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      glRef.current.gl.viewport(0, 0, canvas.width, canvas.height)
    })
    ro.observe(canvas)

    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  // Render loop — always running so edge stays alive
  useEffect(() => {
    const draw = () => {
      const state = glRef.current
      const canvas = canvasRef.current
      if (!state || !canvas) { rafRef.current = requestAnimationFrame(draw); return }

      const { gl, prog } = state
      const t = (performance.now() - t0.current) / 1000
      const p = progRef.current

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Skip rendering when fully revealed
      if (p < 0.99) {
        const u = (n: string) => gl.getUniformLocation(prog, n)
        gl.uniform2f(u('u_res'), canvas.width, canvas.height)
        gl.uniform1f(u('u_progress'), p)
        gl.uniform3fv(u('u_color'), color)
        gl.uniform3fv(u('u_edge'), edgeColor)
        gl.uniform1f(u('u_scale'), noiseScale)
        gl.uniform1f(u('u_ew'), edgeWidth)
        gl.uniform1f(u('u_bloom'), bloom)
        gl.uniform1f(u('u_time'), t)
        gl.uniform1i(u('u_direction'), direction)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [color, edgeColor, noiseScale, edgeWidth, bloom, direction])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full pointer-events-none ${className}`}
      style={className.includes('h-') ? { display: 'block' } : { height: `${height}px`, display: 'block' }}
      aria-hidden="true"
    />
  )
}
