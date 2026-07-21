interface ProductDescriptionProps {
  description: string;
}

// Comfortable reading width and larger, airier type than the rest of
// the page — this is the one place the product is meant to be read,
// not scanned. A short description simply sizes to its content; it's
// never forced into a fixed-height column that would leave a
// stranded gap next to it.
const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <div>
      <h2 className="font-heading text-3xl font-light text-text">The Story</h2>
      <p className="mt-6 max-w-2xl whitespace-pre-line font-body text-lg leading-loose text-text/70">
        {description}
      </p>
    </div>
  );
};

export { ProductDescription };
