"use client"
import { Habit, User } from "@/types";
import HabitForm from "@/components/layout/habit/HabitForm";
import SuccessModal from "@/components/ui/success-modal/SuccessModal";
import { FormEvent, useState } from "react";
import { mapFormDataToHabit } from "@/utils/mappers/habitMapper";
import { useRouter } from "next/navigation";

async function saveHabit(habit: Habit): Promise<boolean> {
    console.log('=== Saving Habit to DB ===');
    console.log('Habit object ready for persistence:', habit);
    console.log('==========================');
    
    // TODO: Implement actual DB persistence
    // When implemented, return true only if backend returns 200/201
    // Example:
    // const response = await fetch('/api/habit', { method: 'POST', body: JSON.stringify(habit) });
    // return response.ok;
    
    return true;
}

export default function HabitPage(){
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const router = useRouter();

    const userCreator: User = {
        username:'Usuario creador',
    }

    const title = `Hi ${userCreator.username} Create your new Habit!`
   
    async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const submitedHabit = mapFormDataToHabit(formData, userCreator.username);
        
        const success = await saveHabit(submitedHabit);
        
        if (success) {
            setShowSuccessModal(true);
        }
    }

    function handleGoToShare() {
        router.push('/habit/share');
    }

    return (
        <div>
            <h1 className="page-title">{title}</h1>
            <HabitForm onSubmit={onSubmitForm} creatorUsername={userCreator.username}/>
            {showSuccessModal && <SuccessModal onGoToShare={handleGoToShare} />}
        </div>
    )
}