interface ProgressBarProps {
  value: number;
  max: number;
}

function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-mute text-sm uppercase">Mastery</p>
        <p className="font-mono text-xs">
          {value}/{max}
        </p>
      </div>

      <div className="bg-mute/20 h-2 w-full overflow-hidden">
        <div
          className="bg-accent h-full transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
