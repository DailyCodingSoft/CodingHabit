'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DirectJoinPageProps {
    params: Promise<{ accessCode: string }>;
}

export default function DirectJoinPage({ params }: DirectJoinPageProps) {
    const { accessCode } = use(params);
    const router = useRouter();
    const [error, setError] = useState('');

    useEffect(() => {
        async function validateAndRedirect() {
            try {
                // TODO: Replace with actual backend validation when DB is ready
                // const response = await fetch(`/api/habit/validate?accessCode=${accessCode}`);
                // if (!response.ok) {
                //     throw new Error('Habit not found');
                // }
                
                // Placeholder: Simulate validation delay
                await new Promise(resolve => setTimeout(resolve, 800));
                
                router.push(`/habit/${accessCode}/progress`);
            } catch (err) {
                setError('Invalid or expired access code');
            }
        }

        validateAndRedirect();
    }, [accessCode, router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center space-y-4">
                    <div className="text-6xl">❌</div>
                    <h1 className="text-2xl font-bold text-gray-900">{error}</h1>
                    <p className="text-gray-600">The code might be incorrect or the habit may no longer exist.</p>
                    <button
                        onClick={() => router.push('/join')}
                        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                        Try Another Code
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <h2 className="text-xl font-semibold text-gray-700">Validating access code...</h2>
                <p className="text-gray-500">Code: {accessCode}</p>
            </div>
        </div>
    );
}
