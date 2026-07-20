import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { StarRating } from '@/components/ui/StarRating';
import { ProductGallery } from '@/components/features/products/ProductGallery';
import { ProductPrice } from '@/components/features/products/ProductPrice';
import { StockStatus } from '@/components/features/products/StockStatus';
import { ProductActions } from '@/components/features/products/ProductActions';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { ProductDescription } from '@/components/features/products/ProductDescription';
import { ProductSpecifications } from '@/components/features/products/ProductSpecifications';
import { ProductReviews } from '@/components/features/products/ProductReviews';
import { RelatedProducts } from '@/components/features/products/RelatedProducts';
import { productService } from '@/services/product.service';
import { reviewService } from '@/services/review.service';
import { Product, ProductsResponse } from '@/types/product.types';

interface ProductDetailPageProps {
  params: { slug: string };
}

// Deduped across generateMetadata and the page body (same slug, same
// request) — the service itself stays a plain reusable function.
const getProduct = cache((slug: string) => productService.getProductBySlug(slug));

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.slug);
    const title = product.seo?.title || product.title;
    const description =
      product.seo?.description || product.shortDescription || product.description;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: product.images?.[0] ? [product.images[0]] : undefined,
      },
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

function getCategoryId(product: Product): string | undefined {
  return typeof product.category === 'object' ? product.category._id : product.category;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;

  let product: Product;
  try {
    product = await getProduct(slug);
  } catch (error: any) {
    if (error?.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const categoryName = typeof product.category === 'object' ? product.category.name : undefined;
  const categoryId = getCategoryId(product);

  const [reviews, relatedData] = await Promise.all([
    reviewService.getProductReviews(product._id).catch(() => []),
    categoryId
      ? productService
          .getProducts({ category: categoryId, limit: 5 })
          .catch((): ProductsResponse | null => null)
      : Promise.resolve(null),
  ]);

  const relatedProducts = (relatedData?.products || [])
    .filter((p) => p._id !== product._id)
    .slice(0, 4);

  return (
    <>
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex flex-col gap-5">
            {categoryName && (
              <span className="font-body text-xs font-medium uppercase tracking-wider text-text/40">
                {categoryName}
              </span>
            )}

            <div className="flex items-start justify-between gap-4">
              <h1 className="font-heading text-3xl text-text sm:text-4xl">{product.title}</h1>
              <WishlistButton product={product} variant="detail" className="flex-shrink-0" />
            </div>

            <div className="flex items-center gap-2">
              <StarRating rating={product.averageRating} />
              {product.numReviews > 0 && (
                <span className="font-body text-sm text-text/50">
                  ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>

            <ProductPrice price={product.price} salePrice={product.salePrice} />

            <StockStatus stock={product.stock} inventoryStatus={product.inventoryStatus} />

            {product.shortDescription && (
              <p className="font-body leading-relaxed text-text/70">
                {product.shortDescription}
              </p>
            )}

            <ProductActions product={product} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <ProductDescription description={product.description} />
            <ProductReviews
              reviews={reviews}
              averageRating={product.averageRating}
              numReviews={product.numReviews}
            />
          </div>
          <ProductSpecifications product={product} />
        </div>
      </Container>

      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
    </>
  );
}
