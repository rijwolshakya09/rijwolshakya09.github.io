export function SectionTitle({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-[60ch] md:mb-14">
      <h2 id={id} className="font-display text-3xl font-extrabold tracking-[-0.02em] md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}
