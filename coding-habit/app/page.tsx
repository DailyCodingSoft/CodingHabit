import Link from 'next/link';
import FeatureCard from '@/components/layout/landing/FeatureCard';
import StatItem from '@/components/layout/landing/StatItem';
import NeonButton from '@/components/ui/NeonButton';
import Footer from '@/components/layout/landing/Footer';
import curiousPhrases from '@/data/curious-phrases.json';

export default function Home() {
  const randomPhrase = curiousPhrases[Math.floor(Math.random() * curiousPhrases.length)];
  
  return (
    <div className="landing-scanlines font-mono bg-[var(--landing-bg)] text-white overflow-x-hidden">

      {/* Hero */}
      <section className="landing-section min-h-screen flex flex-col items-center justify-center px-5 md:px-10 py-15">
        <div className="max-w-[900px] text-center">
          <h1 className="landing-title text-[clamp(2.25rem,10vw,6rem)] font-bold uppercase tracking-[0.5em] leading-tight mb-10">
            Coding Habit
          </h1>

          <p className="text-[var(--neon-green-light)] text-sm md:text-base mb-15 leading-relaxed opacity-90 tracking-wide">
            {randomPhrase}
          </p>

          <div className="mb-8">
            <NeonButton href="/habit">Enlistarse</NeonButton>
          </div>

          <p className="text-[13px] text-[var(--neon-green-dark)] tracking-wide">
            ya tengo una cuenta ·{' '}
            <Link href="/signin" className="neon-link">
              iniciar sesión
            </Link>
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section px-5 md:px-10 py-25 bg-[rgba(10,10,10,0.5)]">
        <div className="text-center mb-20">
          <h2 className="neon-heading text-[clamp(2rem,5vw,3rem)] font-bold uppercase tracking-[0.25em] mb-5">
            Game Features
          </h2>
          <p className="text-lg text-[var(--neon-green-muted)]">
            Everything you need to level up your coding skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 landing-container">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.desc} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="landing-section px-5 md:px-10 py-20 bg-[var(--landing-bg-alt)] border-y-2 border-[var(--neon-green)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-15 landing-container">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-section px-5 md:px-10 py-30 text-center">
        <div className="cta-box max-w-[800px] mx-auto p-10 md:p-15">
          <h2 className="neon-heading text-[clamp(1.75rem,4vw,2.625rem)] font-bold uppercase tracking-widest mb-5">
            Ready to Level Up?
          </h2>
          <p className="neon-body-text text-lg mb-10 leading-relaxed">
            Join thousands of developers who are building better coding habits.
            Start your journey today.
          </p>
          <NeonButton href="/register">Create Account</NeonButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FEATURES = [
  { icon: '🎯', title: 'Daily Quests', desc: 'Complete coding challenges every day to build consistency and unlock achievements. Miss a day? Face the consequences with our unique debt system.' },
  { icon: '🔥', title: 'Streak Tracking', desc: 'Build unstoppable momentum with our streak system. Watch your consecutive days grow and compete for the longest streak in your guild.' },
  { icon: '💰', title: 'Debt System', desc: 'Missed a challenge? Your debt accumulates. Pay it off by completing extra challenges or watch it grow. Real consequences, real motivation.' },
  { icon: '👥', title: 'Guild System', desc: 'Join forces with other coders. Share your progress, compete in leaderboards, and hold each other accountable.' },
  { icon: '📊', title: 'Analytics', desc: 'Deep insights into your coding patterns. Track your most productive times, favorite languages, and areas for improvement.' },
  { icon: '🏆', title: 'Achievements', desc: 'Unlock badges, level up your profile, and showcase your dedication. From "First Steps" to "Code Master" - earn them all.' },
];

const STATS = [
  { value: '10K+', label: 'Active Coders' },
  { value: '1M+', label: 'Challenges Completed' },
  { value: '365', label: 'Longest Streak' },
  { value: '50+', label: 'Programming Languages' },
];
