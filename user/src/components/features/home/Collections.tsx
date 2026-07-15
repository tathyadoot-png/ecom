'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

// Future: This data can come from a backend API
const collections = [
  {
    id: '1',
    title: 'Summer Collection',
    description: 'Light, breathable, and handcrafted for the season.',
    image: '/images/collections/summer.jpg',
    slug: 'summer-collection',
    theme: 'terracotta',
  },
  {
    id: '2',
    title: 'Festival Edit',
    description: 'Celebrate with vibrant colors and intricate details.',
    image: '/images/collections/festival.jpg',
    slug: 'festival-edit',
    theme: 'gold',
  },
  {
    id: '3',
    title: 'Artisan Classics',
    description: 'Timeless pieces that never go out of style.',
    image: '/images/collections/classics.jpg',
    slug: 'artisan-classics',
    theme: 'forest',
  },
];

const Collections = () => {
  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeading
          title="Curated Collections"
          subtitle="Thoughtfully curated for every occasion"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden rounded-card"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-card">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <h3 className="font-heading text-2xl font-medium">{collection.title}</h3>
                <p className="mt-1 text-sm text-cream/80 font-body">{collection.description}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-cream/80 transition-transform group-hover:translate-x-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Collections;