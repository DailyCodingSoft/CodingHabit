"use client"
import { Habit, User } from "@/types";
import { useEffect, useState } from "react";
import HabitForm from "@/components/layout/habit/HabitForm";
import { FormEvent } from "react";
import { mapFormDataToHabit } from "@/utils/mappers/habitMapper";

//const user = context.getuser() //hacer algo asi para obtener el usuario de la sesion.

export default function HabitPage(){
    //this has to be done trought a initializar
    const userCreator: User = {
        username:'Usuario creador',
    }

    const [habit, setHabit] = useState<Habit>({
        title:'defaultHabit',
        debtValue: 1000,
        isCumulative: false,
        initialDate: Date.now().toString(),
        creator: userCreator.username,
    });
    
    //get the title out of the user name
    const title = `Hi ${habit.creator} Create your new Habit!`
   
    function onSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        //To Do: la data del form no esta quedando guardada en el habit.
        //Update: queda pero en la segunda llamada al submit, 
        //debe ser problema con el handlind del state.
        const submitedHabit = mapFormDataToHabit(formData, habit.creator);
        setHabit(submitedHabit);
        console.log('Habito listo para guardar en DB: ');
        console.log(habit);
    }

    return (
        <div>
            <h1>{title}</h1>
            <HabitForm onSubmit={onSubmitForm}/>
        </div>
    )
}