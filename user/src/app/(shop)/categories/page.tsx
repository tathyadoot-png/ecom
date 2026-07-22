import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { categoryService } from '@/services/category.service';
import { SITE } from '@/constants/site';

const TITLE = 'All Categories';
const DESCRIPTION = 'Browse every category of handcrafted Indian products.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/categories`,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function CategoriesPage() {
  const categories = await categoryService.getCategories();
  const activeCategories = categories.filter((category) => category.isActive !== false);

  return (
    <Container className="py-10">
      <SectionHeading
        title="Shop by Category"
        subtitle="Discover treasures from across India"
        align="left"
        className="text-left"
      />

      {activeCategories.length === 0 ? (
        <p className="mt-10 font-body text-text/60">No categories available yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </Container>
  );
}
