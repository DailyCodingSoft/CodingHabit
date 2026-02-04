"use client"
import { Habit, User } from "@/types";
import { useState } from "react";
import HabitForm from "@/components/layout/habit/HabitForm";

export default function HabitPage(){
    //intended flow
    //1. user logins or register for the first time
    //2. the first page they see is the habit creation page
    //3. the page asks for a new title for the habit
    //4. asks for the initial date
    //5. ask for end date (optional)

    //this has to be done trought a initializar
    const userCreator: User = {
        username:'Usuario creador',
    }

    const [habit, setHabit] = useState<Habit>({
        title:'defaultHabit',
        debtValue: 1000,
        isCumulative: false,
        initialDate: Date.now().toString(),
        creator: userCreator,
    });
    
    //get the title out of the user name
    const title = `Hi ${habit.creator.username} Create your new Habit!`
    


    return (
        <div>
            <h1>{title}</h1>
            <HabitForm />
        </div>
    )
}