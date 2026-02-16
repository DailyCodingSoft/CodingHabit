"use client"
import { Habit, User } from "@/types";
import HabitForm from "@/components/layout/habit/HabitForm";
import { FormEvent } from "react";
import { mapFormDataToHabit } from "@/utils/mappers/habitMapper";

//const user = context.getuser()

async function saveHabit(habit: Habit): Promise<void> {
    console.log('=== Saving Habit to DB ===');
    console.log('Habit object ready for persistence:', habit);
    console.log('==========================');
    
    // TODO: Implement actual DB persistence
}

export default function HabitPage(){
    const userCreator: User = {
        username:'Usuario creador',
    }

    const title = `Hi ${userCreator.username} Create your new Habit!`
   
    async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const submitedHabit = mapFormDataToHabit(formData, userCreator.username);
        
        await saveHabit(submitedHabit);
    }

    return (
        <div>
            <h1 className="page-title">{title}</h1>
            <HabitForm onSubmit={onSubmitForm} creatorUsername={userCreator.username}/>
        </div>
    )
}