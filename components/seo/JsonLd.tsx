type JsonLdProps = {
  /** A schema.org object, or an array of them. */
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

/**
 * Renders JSON-LD structured data. Server component — no client cost.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={id ? `${id}-${index}` : index}
          type="application/ld+json"
          // Structured data is authored in this repo, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
