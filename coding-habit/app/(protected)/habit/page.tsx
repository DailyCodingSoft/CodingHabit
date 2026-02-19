"use client"
import { Habit, User } from "@/types";
import HabitForm from "@/components/layout/habit/HabitForm";
import SuccessModal from "@/components/ui/success-modal/SuccessModal";
import { FormEvent, useState } from "react";
import { mapFormDataToHabit } from "@/utils/mappers/habitMapper";
import { generateAccessCode } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { validateHabitParticipants } from "@/domain/services/habitValidationService";

async function saveHabit(habit: Habit): Promise<boolean> {
    console.log('Habit object ready for db:', habit);
    
    // TODO: Implement actual DB persistence
    // Backend will store habitId as primary key and accessCode as unique field
    // Example:
    // const response = await fetch('/api/habit', { method: 'POST', body: JSON.stringify(habit) });
    // return response.ok;
    
    return true;
}

export default function HabitPage(){
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [createdAccessCode, setCreatedAccessCode] = useState<string>("");
    const router = useRouter();

    const userCreator: User = {
        username:'ISCSantIa',
    }

    const title = `Hi ${userCreator.username} Create your new Habit!`
   
    async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const submitedHabit = mapFormDataToHabit(formData, userCreator.username);
        
        const accessCode = generateAccessCode();
        submitedHabit.accessCode = accessCode;
        
        if (submitedHabit.repoName && submitedHabit.participants) {
            const [owner, repo] = submitedHabit.repoName.split('/');
            const participantUsernames = submitedHabit.participants.map(p => p.username);
            
            try {
                const result = await validateHabitParticipants(owner, repo, participantUsernames);
                
                submitedHabit.participants = submitedHabit.participants?.map(user => ({
                    ...user,
                    validationStatus: result.validatedUsers.includes(user.username) ? 'validated' : 'pending'
                }));

                if (result.allValidated) {
                    submitedHabit.status = 'active';
                    console.log('All participants validated! Habit is now active.', result);
                }
            } catch (error) {
                console.error('Validation error:', error);
            }
        }
        
        const success = await saveHabit(submitedHabit);
        
        if (success) {
            setCreatedAccessCode(accessCode);
            sessionStorage.setItem('createdHabit', JSON.stringify(submitedHabit));
            setShowSuccessModal(true);
            // TODO: Update habit status in database
        }
    }

    function handleGoToShare() {
        router.push(`/habit/${createdAccessCode}/share`);
    }

    return (
        <div>
            <h1 className="page-title">{title}</h1>
            <HabitForm onSubmit={onSubmitForm} creatorUsername={userCreator.username}/>
            {showSuccessModal && <SuccessModal onGoToShare={handleGoToShare} />}
        </div>
    )
}
