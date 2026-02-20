import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Image
          src="/landingv2.png"
          alt="CodingHabit"
          width={800}
          height={300}
          className="mb-8 mx-auto"
          priority
        />
        <Link
          href="/habit"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg"
        >
          Start Now
        </Link>
      </div>
    </div>
  );
}