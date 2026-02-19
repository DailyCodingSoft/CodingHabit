"use client";

import { Habit } from "@/types";
import { useEffect, useState } from "react";
import { mapSessionStorageToHabit } from "@/utils/mappers/habitMapper";
import ActiveHabitPage from "./activeHabit";
import PendingHabitPage from "./pendingHabit";

export default function ProgressPage() {
    const [habit, setHabit] = useState<Habit | null>(null);
    const currentUser = "john_doe"; // TODO: Get from auth context
    
    useEffect(() => {
        const storedHabit = sessionStorage.getItem('createdHabit');
        console.log('Habito de session sin parsear: ', storedHabit);
        if (storedHabit) {
            const parsedHabit = mapSessionStorageToHabit(storedHabit);
            if (parsedHabit) {
                setHabit(parsedHabit);
                console.log('Habito de session: ', parsedHabit);
            }
        } else {
            // TODO: Fetch habit from backend using accessCode when DB is ready
            const mockHabit: Habit = {
                id: "mock-id",
                accessCode: "A2E3-4F7B",
                title: "Daily Code Challenge",
                creator: "john_doe",
                participants: [
                    { username: "john_doe" },
                    { username: "jane_smith" },
                    { username: "octocat" }
                ],
                debtValue: 5000,
                isCumulative: true,
                initialDate: "2026-02-01",
                endDate: "2026-03-01",
                repoName: "DailyCoding/challenges",
                status: "pending_validation"
            };
            setHabit(mockHabit);
        }
    }, []);
    
    useEffect(() => {
        if (habit) {
            sessionStorage.removeItem('createdHabit');
        }
    }, [habit]);
    
    if (!habit) {
        return <div className="text-white text-center p-6">Loading...</div>;
    }
    
    const isPendingValidation = habit.status === "pending_validation";
    
    return isPendingValidation ? (
        <PendingHabitPage habit={habit} currentUser={currentUser} />
    ) : (
        <ActiveHabitPage />
    );
}
