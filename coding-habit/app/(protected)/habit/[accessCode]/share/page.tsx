"use client"
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Habit } from "@/types";

interface SharePageProps {
    params: Promise<{
        accessCode: string;
    }>;
}

export default function SharePage({ params }: SharePageProps) {
    const [copySuccess, setCopySuccess] = useState(false);
    const [habit, setHabit] = useState<Habit | null>(null);
    const router = useRouter();
    
    const { accessCode } = use(params);
    const shareableLink = `https://codinghabit.app/join/${accessCode}`;

    useEffect(() => {
        const storedHabit = sessionStorage.getItem('createdHabit');
        if (storedHabit) {
            setHabit(JSON.parse(storedHabit));
        }
    }, []);

    async function handleCopyCode() {
        try {
            await navigator.clipboard.writeText(accessCode);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    function handleGoToPlayers() {
        router.push(`/habit/${accessCode}/progress`);
    }

    if (!habit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-[var(--shadow-lg)] p-8">
                <div className="text-center mb-8">
                    <div className="mb-4">
                        <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Habit Created Successfully!</h1>
                    <p className="text-gray-600">
                        Share this access code with your participants so they can join.
                    </p>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Access Code
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={accessCode}
                            readOnly
                            className="flex-1 text-center text-2xl font-mono font-bold px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50"
                        />
                        <button
                            onClick={handleCopyCode}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {copySuccess ? '✓ Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shareable Link
                    </label>
                    <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
                        <a href={shareableLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                            {shareableLink}
                        </a>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Participants</h3>
                    <ul className="space-y-2">
                        {habit.participants?.map((participant, index) => (
                            <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span>{participant.username}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleGoToPlayers}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
                >
                    Go to Players Screen
                </button>
            </div>
        </div>
    );
}
