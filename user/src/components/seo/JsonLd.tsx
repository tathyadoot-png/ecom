interface JsonLdProps {
  data: Record<string, unknown>;
}

// `<` is escaped to prevent a `</script>` breakout via user/vendor
// supplied content (product titles, etc.) ending up inside this tag.
const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);

export { JsonLd };
