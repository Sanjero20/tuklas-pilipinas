interface Props {
  provinceName?: string;
}

export function LocateQuestion({ provinceName }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-mute font-mono text-xs">Where is ...</p>

      <p className="text-ink font-serif text-4xl">{provinceName}</p>
    </div>
  );
}
