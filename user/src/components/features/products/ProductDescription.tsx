interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div>
      <h2 className="mb-4 font-heading text-2xl text-text">Description</h2>
      <p className="whitespace-pre-line font-body leading-relaxed text-text/70">
        {description}
      </p>
    </div>
  );
};

export { ProductDescription };
