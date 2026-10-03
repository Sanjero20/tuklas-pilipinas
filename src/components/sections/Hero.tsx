import Button from "../ui/Button";
import Map from "../ui/MapContainer";

import { translateToBaybayin } from "../../utils/baybayin";

const tags = ["TUKLAS", "MAPA NG PILIPINAS", "FREE", "NO SIGN-UP"];

function Hero() {
  return (
    <section className="grid items-center gap-10 py-12 sm:py-16 lg:max-h-svh lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-12">
      {/* Left */}
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-widest uppercase">
          <span
            aria-hidden="true"
            className="font-baybayin text-accent text-base tracking-normal normal-case"
          >
            {translateToBaybayin("Pilipinas")}
          </span>

          {tags.map((tag, index) => (
            <span key={tag} className="text-mute flex gap-2">
              {tag}
              {/* separators only when there's room; on mobile the tags just wrap */}
              {index < tags.length - 1 && (
                <span aria-hidden="true" className="hidden sm:inline">
                  &middot;
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[80px]">
          Learn the map of the Philippines,{" "}
          <em className="text-accent not-italic">province by province.</em>
        </h1>

        {/* Description */}
        <p className="text-mute max-w-[46ch] text-base sm:text-lg">
          Stop scrolling through lists. Point at the map, get instant feedback,
          and let the provinces you miss come back until they stick.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Button>START TRAINING</Button>
          <Button variant="secondary">EXPLORE THE MAP</Button>
        </div>
      </div>

      {/* Right */}
      <div className="border-ink bg-sea mx-auto aspect-square w-full max-w-md border sm:aspect-3/4 lg:mx-0 lg:h-[min(36rem,calc(100svh_-_14rem))] lg:w-auto lg:max-w-none lg:justify-self-end">
        <Map />
      </div>
    </section>
  );
}

export default Hero;
