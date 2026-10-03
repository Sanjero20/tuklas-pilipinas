import Map from "../components/ui/MapContainer";

function ExplorePage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-8 md:flex-row">
      {/* Map */}
      <div className="h-[50vh] min-h-0 min-w-0 flex-1 md:h-auto">
        <Map />
      </div>

      {/* Info */}
      <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
        <p className="text-mute font-mono text-xs">SELECTED</p>

        <p className="text-ink font-serif text-4xl">Tap A Province</p>

        <div className="border-ink flex w-full justify-between border-b py-3">
          <p className="text-mute">REGION</p>
          <p className="text-ink font-bold">NCR</p>
        </div>

        <div className="border-ink flex w-full justify-between border-b py-3">
          <p className="text-mute">CAPITAL</p>
          <p className="text-ink font-bold">METRO MANILA</p>
        </div>
      </aside>
    </main>
  );
}

export default ExplorePage;
