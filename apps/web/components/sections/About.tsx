import { urlFor } from '@/lib/sanity'

interface AboutData {
  aboutText?: Array<{ _type: string; children?: Array<{ text: string }> }>
  aboutImage?: object
  features?: Array<{ icon?: string; title?: string; text?: string }>
}

export default function About({ data }: { data: AboutData | null }) {
  const aboutImg = data?.aboutImage
    ? urlFor(data.aboutImage as Parameters<typeof urlFor>[0]).width(900).quality(85).url()
    : null

  const features = data?.features?.length ? data.features : DEFAULT_FEATURES

  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: 'var(--color-charcoal)' }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Image — full bleed on its column */}
        <div className="aspect-[3/4] overflow-hidden relative">
          {aboutImg ? (
            <img src={aboutImg} alt="Paila Restaurant interior" className="img-bleed" />
          ) : (
            <div
              className="w-full h-full flex items-end p-8"
              style={{
                background: 'linear-gradient(160deg, #3D1F0D 0%, #1C0A00 100%)',
              }}
            >
              {/* Decorative quote overlay */}
              <blockquote
                className="font-accent italic text-xl leading-relaxed"
                style={{ fontFamily: 'var(--font-family-accent)', color: 'rgba(212,168,83,0.7)' }}
              >
                &ldquo;Food is the thread that stitches<br />every story worth telling.&rdquo;
              </blockquote>
            </div>
          )}
          {/* Gold accent line */}
          <div
            className="absolute top-0 left-0 w-1 h-24"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
        </div>

        {/* Text */}
        <div>
          <p
            className="font-accent italic text-base mb-4 tracking-wide"
            style={{ fontFamily: 'var(--font-family-accent)', color: 'var(--color-gold)' }}
          >
            Our Story
          </p>
          <h2
            className="text-display font-display mb-8"
            style={{ fontFamily: 'var(--font-family-display)', color: 'var(--color-cream)' }}
          >
            A family table,<br />open to all
          </h2>

          <div className="font-sans text-base leading-relaxed space-y-4"
            style={{ color: 'rgba(237,228,216,0.72)' }}>
            {data?.aboutText ? (
              // Render portable text blocks as paragraphs
              data.aboutText
                .filter(b => b._type === 'block')
                .map((block, i) => (
                  <p key={i}>
                    {block.children?.map(c => c.text).join('')}
                  </p>
                ))
            ) : (
              <>
                <p>
                  Paila began as a dream shared around a kitchen table — a place where the warmth
                  of Nepali hospitality meets the vibrance of modern dining.
                </p>
                <p>
                  Every dish we serve carries the memory of a grandmother&apos;s recipe,
                  refined with care for the table you share with us today.
                </p>
                <p>
                  We source our ingredients from local farms across the valley, honoring the
                  farmers who sustain our community and the seasons that dictate our menu.
                </p>
              </>
            )}
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {features.map((f, i) => (
              <div
                key={i}
                className="pt-4"
                style={{ borderTop: '1px solid rgba(247,240,230,0.1)' }}
              >
                <span className="text-2xl mb-2 block">{f.icon ?? '✦'}</span>
                <p className="font-sans font-medium text-sm mb-1"
                  style={{ color: 'var(--color-cream)' }}>
                  {f.title}
                </p>
                <p className="font-sans text-xs leading-relaxed"
                  style={{ color: 'var(--color-mist)' }}>
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const DEFAULT_FEATURES = [
  { icon: '🌾', title: 'Farm to Table',       text: 'Seasonal ingredients sourced from local Nepali farms.' },
  { icon: '🔥', title: 'Live Fire Cooking',   text: 'Charcoal grills and clay ovens at the heart of our kitchen.' },
  { icon: '🍷', title: 'Curated Bar',         text: 'Craft cocktails inspired by Himalayan botanicals.' },
  { icon: '🎶', title: 'Live Music',          text: 'Local artists perform every Friday and Saturday evening.' },
]
