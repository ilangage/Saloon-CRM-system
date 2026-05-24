import Image from "next/image";
import { GALLERY_IMAGES } from "@/src/lib/config";

export default function Gallery() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose">
            Gallery
          </p>

          <h2 id="gallery-title" className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            A clean, modern salon look
          </h2>

          <p className="mt-4 text-charcoal/70">
            Real salon photos from Fur Naills Beauty Salon.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_IMAGES.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={600}
              height={700}
              className="aspect-[4/5] rounded-[1.5rem] object-cover shadow-lg shadow-wine/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
