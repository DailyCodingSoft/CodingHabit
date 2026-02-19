"use client"

import { Habit } from '@/types'

interface PendingHabitPageProps {
    habit: Habit
    currentUser: string
}

export default function PendingHabitPage({ habit, currentUser }: PendingHabitPageProps) {
    const isCreator = currentUser === habit.creator
    const validatedCount = 0
    const totalParticipants = habit.participants?.length || 0
    console.log('aqui esta llegando esta madre: ', habit)

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{habit.title}</h1>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-md text-sm font-medium">
                        Pending Validation
                    </span>
                </div>
                <p className="text-gray-300 mt-4">
                    All participants must make their first commit to the repository before habit tracking begins.
                </p>
            </div>

            {/* Repository Info Section */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">Repository</h2>
                <a 
                    href={`https://github.com/${habit.repoName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                >
                    {habit.repoName}
                </a>
                <p className="text-gray-400 text-sm mt-2">
                    Make sure you're a contributor to this repository
                </p>
            </div>

            {/* Progress Summary */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-white">Validation Progress</h2>
                    <span className="text-gray-300">
                        {validatedCount} / {totalParticipants} participants ready
                    </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(validatedCount / totalParticipants) * 100}%` }}
                    />
                </div>
            </div>

            {/* Participants List */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">Participants</h2>
                <ul className="space-y-3">
                    {habit.participants?.map((user, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">⏳</span>
                                
                                <span className="text-white">
                                    {user.username}
                                    {user.username === habit.creator && (
                                        <span className="ml-2 text-sm text-blue-400">(Creator)</span>
                                    )}
                                </span>
                            </div>

                            {isCreator && (
                                <button 
                                    className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                                >
                                    Edit
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Revalidate Button */}
            <div className="flex justify-center">
                <button 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                >
                    Check Validation Status
                </button>
            </div>
        </div>
    );
}
