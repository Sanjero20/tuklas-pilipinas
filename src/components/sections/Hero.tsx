import Button from "../ui/Button";
import { translateToBaybayin } from "../../utils/baybayin";

const tags = ["TUKLAS", "MAPA NG PILIPINAS", "FREE", "NO SIGN-UP"];

function Hero() {
  return (
    <section className="flex items-center gap-4">
      {/* Left */}
      <div className="flex w-2/3 flex-col gap-8">
        {/* Tags */}
        <div className="flex items-center gap-2">
          <span>{translateToBaybayin("Pilipinas")}</span>

          <div className="text-mute flex gap-2">
            {tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {index < tags.length - 1 && <> &middot;</>}
              </span>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-8xl">
          Learn the map of the Philippines,{" "}
          <em className="text-accent">province by province.</em>
        </h1>

        {/* Description */}
        <p className="text-muted text-lg">
          Stop scrolling through lists. Point at the map, get instant feedback,
          and let the provinces you miss come back until they stick.
        </p>

        {/* CTA */}
        <div className="flex gap-4">
          <Button>START TRAINING</Button>
          <Button variant="secondary">EXPLORE THE MAP</Button>
        </div>
      </div>

      {/* Right */}
      <div className="border-ink bg-sea aspect-3/4 w-1/3 border"></div>
    </section>
  );
}

export default Hero;
