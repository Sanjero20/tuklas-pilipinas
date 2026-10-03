const features = [
  {
    label: "01 / Explore",
    title: "See it first",
    text: "Pan, zoom and hover to read the map at your own pace. Names stay hidden in quiz modes so nothing gets spoiled.",
  },
  {
    label: "02 / Train",
    title: "Locate or name it",
    text: "Find the province on the map, or identify the highlighted one from four choices. Streaks reward consistency.",
  },
  {
    label: "03 / Master",
    title: "Focus by region",
    text: "Drill Luzon, Visayas or Mindanao on its own, and watch your mastery bar fill as provinces lock in.",
  },
];

function Features() {
  return (
    <section className="border-ink grid grid-cols-1 border-t md:grid-cols-3">
      {features.map((f, i) => {
        const isFirst = i === 0;
        const isLast = i === features.length - 1;

        return (
          <article
            key={f.label}
            className={[
              "border-ink space-y-3 py-8 md:px-8 md:py-12",
              // stacked on mobile: horizontal rule between items
              // side by side on desktop: vertical rule between items
              !isFirst && "border-t md:border-t-0 md:border-l",
              // keep the outer columns flush with the page edges
              isFirst && "md:pl-0",
              isLast && "md:pr-0",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p className="text-mute font-mono text-xs tracking-widest uppercase">
              {f.label}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl">{f.title}</h3>
            <p className="text-mute">{f.text}</p>
          </article>
        );
      })}
    </section>
  );
}

export default Features;
