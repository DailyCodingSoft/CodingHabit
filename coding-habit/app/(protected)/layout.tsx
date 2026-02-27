import Header from "@/components/layout/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--landing-bg)]">
      <Header />
      <main className="flex-1 p-6 pt-24">
        {children}
      </main>
    </div>
  );
}
