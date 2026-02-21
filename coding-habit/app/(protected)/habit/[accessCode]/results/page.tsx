"use client"

import { use } from "react"
import Link from "next/link"

interface PageProps {
    params: Promise<{ accessCode: string }>
}

export default function ResultsPage({ params }: PageProps) {
    const { accessCode } = use(params)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
            <h1 className="text-3xl font-bold">Habit Complete! 🎉</h1>
            <p className="text-gray-500">Access code: <span className="font-mono">{accessCode}</span></p>

            <div className="flex flex-col gap-2 w-full max-w-xs">
                <div className="border rounded p-4 text-center text-gray-400">Final standings (coming soon)</div>
                <div className="border rounded p-4 text-center text-gray-400">Statistics (coming soon)</div>
            </div>

            <div className="flex gap-4">
                <Link href={`/habit/${accessCode}/progress`} className="px-4 py-2 border rounded hover:bg-gray-100">
                    View Progress
                </Link>
                <Link href="/habit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    Create New Habit
                </Link>
            </div>

            {/* TODO: fetch final habit data from backend using accessCode */}
        </div>
    )
}
