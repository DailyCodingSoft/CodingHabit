'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
    const router = useRouter();
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    function validateAccessCodeFormat(code: string): boolean {
        const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(code);
    }

    function formatAccessCode(value: string): string {
        const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (cleaned.length <= 4) {
            return cleaned;
        }
        return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`;
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatAccessCode(e.target.value);
        setAccessCode(formatted);
        setError('');
    }

    async function handleJoinHabit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!validateAccessCodeFormat(accessCode)) {
            setError('Invalid code format. Expected: XXXX-XXXX');
            return;
        }

        setIsValidating(true);
        setError('');

        try {
            // TODO: Replace with actual backend validation when DB is ready
            // const response = await fetch(`/api/habit/validate?accessCode=${accessCode}`);
            // if (!response.ok) {
            //     throw new Error('Habit not found');
            // }
            
            // Placeholder: Simulate validation delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            router.push(`/habit/${accessCode}/progress`);
        } catch (err) {
            setError('Habit not found. Please check the code and try again.');
        } finally {
            setIsValidating(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Join a Habit
                    </h1>
                    <p className="text-gray-600">
                        Enter the access code shared by the habit creator
                    </p>
                </div>

                <form onSubmit={handleJoinHabit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                            Access Code
                        </label>
                        <input
                            id="accessCode"
                            type="text"
                            value={accessCode}
                            onChange={handleInputChange}
                            maxLength={9}
                            placeholder="XXXX-XXXX"
                            className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isValidating || accessCode.length < 9}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
                        style={{ transitionDuration: 'var(--transition-fast)' }}
                    >
                        {isValidating ? 'Validating...' : 'Join Habit'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    <p>Don't have a code? Ask the habit creator to share it with you.</p>
                </div>
            </div>
        </div>
    );
}
