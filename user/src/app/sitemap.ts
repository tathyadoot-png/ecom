import { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';
import { productService } from '@/services/product.service';
import { categoryService } from '@/services/category.service';

// Reuses the same services every other page already uses — no
// hardcoded product/category URLs, no dedicated sitemap endpoint
// exists on the backend so this assembles it from what's public.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE.url}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE.url}/categories`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/login`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/register`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [productsData, categories] = await Promise.all([
    productService
      .getProducts({ limit: 1000 })
      .catch(() => ({ products: [], pagination: { total: 0, page: 1, limit: 0, totalPages: 0 } })),
    categoryService.getCategories().catch(() => []),
  ]);

  const productRoutes: MetadataRoute.Sitemap = productsData.products.map((product) => ({
    url: `${SITE.url}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => category.isActive !== false)
    .map((category) => ({
      url: `${SITE.url}/categories/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
