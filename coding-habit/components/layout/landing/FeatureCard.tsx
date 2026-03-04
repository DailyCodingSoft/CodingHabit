interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card p-10">
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="neon-body-text leading-relaxed">{description}</p>
    </div>
  );
}
