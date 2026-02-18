"use client";

import ActiveHabitPage from "./activeHabit";
import PendingHabitPage from "./pendingHabit";


export default function ProgressPage() {
    // TODO: Replace with actual habit.status from database once backend is ready
    // This will come from fetching the habit by accessCode
    const isPendingValidation = false;
    
    return isPendingValidation ? <PendingHabitPage/> : <ActiveHabitPage/>;
}
