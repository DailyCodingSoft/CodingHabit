"use client"

import { Habit } from '@/types'
import { useState } from 'react'
import { validateHabitParticipants } from '@/domain/services/habitValidationService'

interface PendingHabitPageProps {
    habit: Habit
    currentUser: string
    onHabitActivated: (updatedHabit: Habit) => void
}

export default function PendingHabitPage({ habit, currentUser, onHabitActivated }: PendingHabitPageProps) {
    const isCreator = currentUser === habit.creator
    const [localHabit, setLocalHabit] = useState(habit)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editingUsername, setEditingUsername] = useState('')
    const [isValidating, setIsValidating] = useState(false)
    
    const validatedCount = localHabit.participants?.filter(user => user.validationStatus === 'validated').length || 0
    const totalParticipants = localHabit.participants?.length || 0
    const allValidated = validatedCount === totalParticipants && totalParticipants > 0

    function handleEditClick(index: number, currentUsername: string) {
        setEditingIndex(index)
        setEditingUsername(currentUsername)
    }

    function handleCancelEdit() {
        setEditingIndex(null)
        setEditingUsername('')
    }

    function handleSaveEdit(index: number) {
        if (!editingUsername.trim()) {
            alert('Username cannot be empty')
            return
        }

        const updatedParticipants = localHabit.participants?.map((user, i) => 
            i === index ? { ...user, username: editingUsername.trim(), validationStatus: 'pending' as const } : user
        )

        const updatedHabit = {
            ...localHabit,
            participants: updatedParticipants
        }

        setLocalHabit(updatedHabit)
        setEditingIndex(null)
        setEditingUsername('')

        console.log('Updated habit to save to DB:', updatedHabit)
        // TODO: Save updated habit participants to database
        // NOTE: This only updates participant usernames (non-authenticated users)
        // TODO: Re-run validation after username update to check if new username is a contributor
    }

    async function handleRevalidate() {
        if (!localHabit.repoName || !localHabit.participants) {
            alert('Missing repository or participants information')
            return
        }

        setIsValidating(true)

        try {
            const [owner, repo] = localHabit.repoName.split('/')
            const participantUsernames = localHabit.participants.map(p => p.username)
            
            const result = await validateHabitParticipants(owner, repo, participantUsernames)
            
            const updatedParticipants = localHabit.participants.map(user => ({
                ...user,
                validationStatus: result.validatedUsers.includes(user.username) ? 'validated' as const : 'pending' as const
            }))

            const updatedHabit = {
                ...localHabit,
                participants: updatedParticipants,
                status: result.allValidated ? 'active' as const : 'pending_validation' as const
            }

            setLocalHabit(updatedHabit)

            if (result.allValidated) {
                console.log('All participants validated! Habit is now active.')
                // TODO: Update habit status to 'active' in database
            } else {
                console.log('Validation result:', result)
                // TODO: Update habit participants validation status in database
            }

        } catch (error) {
            console.error('Validation error:', error)
            alert('Failed to validate participants. Please try again.')
        } finally {
            setIsValidating(false)
        }
    }

    function handleStartHabit() {
        if (!allValidated) return

        const activeHabit = {
            ...localHabit,
            status: 'active' as const
        }

        console.log('Starting habit - updating status to active:', activeHabit)
        // TODO: Update habit status to 'active' in database
        
        onHabitActivated(activeHabit)
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{localHabit.title}</h1>
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
                    href={`https://github.com/${localHabit.repoName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                >
                    {localHabit.repoName}
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
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(validatedCount / totalParticipants) * 100}%`, transitionDuration: 'var(--transition-normal)' }}
                    />
                </div>
            </div>

            {/* Participants List */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">Participants</h2>
                <ul className="space-y-3">
                    {localHabit.participants?.map((user, index) => {
                        const isValidated = user.validationStatus === 'validated'
                        const isEditing = editingIndex === index
                        
                        return (
                            <li key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-2xl">
                                        {isValidated ? '✅' : '⏳'}
                                    </span>
                                    
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editingUsername}
                                            onChange={(e) => setEditingUsername(e.target.value)}
                                            className="px-3 py-1 bg-gray-600 text-white rounded-md border border-gray-500 focus:border-blue-400 outline-none"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="text-white">
                                            {user.username}
                                            {user.username === localHabit.creator && (
                                                <span className="ml-2 text-sm text-blue-400">(Creator)</span>
                                            )}
                                        </span>
                                    )}
                                </div>

                                {isCreator && (
                                    <div className="flex gap-2">
                                        {isEditing ? (
                                            <>
                                                <button 
                                                    onClick={() => handleSaveEdit(index)}
                                                    className="px-3 py-1 text-sm bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    onClick={handleCancelEdit}
                                                    className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Don't allow editing creator's username - creator is an authenticated user with an account */}
                                                {user.username !== localHabit.creator && (
                                                    <button 
                                                        onClick={() => handleEditClick(index, user.username)}
                                                        className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 items-center">
                <button 
                    onClick={handleRevalidate}
                    disabled={isValidating}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                    {isValidating ? 'Checking...' : 'Check Validation Status'}
                </button>

                <button 
                    onClick={handleStartHabit}
                    disabled={!allValidated}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-lg"
                >
                    {allValidated ? 'Start Habit 🚀' : 'Start Habit (Waiting for validation...)'}
                </button>
            </div>
        </div>
    );
}
