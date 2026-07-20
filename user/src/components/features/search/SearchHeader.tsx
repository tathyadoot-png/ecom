interface SearchHeaderProps {
  query: string;
  total: number;
}

const SearchHeader = ({ query, total }: SearchHeaderProps) => {
  return (
    <div>
      <h1 className="font-heading text-3xl text-text">Search Results</h1>
      <p className="mt-1 font-body text-text/60">
        {total} {total === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
      </p>
    </div>
  );
};

export { SearchHeader };
