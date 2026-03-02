interface StatItemProps {
  value: string;
  label: string;
}

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="stat-item text-center p-8">
      <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] font-bold mb-2">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
