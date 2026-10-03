import Button from "../ui/Button";

function CtaBand() {
  return (
    <section className="border-ink bg-sea mt-12 mb-6 border">
      <div className="flex flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Ten minutes a day beats a cram session.
          </h2>
          <p className="text-mute max-w-[44ch] text-base sm:text-lg">
            Pick a region, learn a few provinces, come back tomorrow.
          </p>
        </div>

        <Button>START TRAINING</Button>
      </div>
    </section>
  );
}

export default CtaBand;
