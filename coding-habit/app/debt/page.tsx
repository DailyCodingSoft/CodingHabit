"use client";

import { useEffect, useState } from "react";
import {RedisKeyDict, User} from '../../types/index'
import StreakGrid from "@/components/layout/streak_grid/StreakGrid";
import Streak from "@/components/ui/streak/Streak";
import PlusButton from "@/components/ui/plus-button/PlusButton";
import DebtUpdatePopup from "@/components/layout/popup/DebtUpdatePopup";

const DEBT_KEYS = {
    santi: 'SANTI_DEBT',
    lpz: 'LPZ_DEBT',
    cris: 'CRIS_DEBT',
} as RedisKeyDict

const STREAK_KEYS = {
    santi: 'SANTI_STREAK',
    lpz: 'LPZ_STREAK',
    cris: 'CRIS_STREAK',
} as RedisKeyDict;

type DebtMap = Record<keyof typeof DEBT_KEYS, number>;

//crear estos con DB @lpzzzzzzz
    const lpzUser: User = {
        username: 'elepezeta',
        image: '/place_holders/userpicture.png'
    }
    const santiUser: User = {
        username: 'hacktiago',
        image: '/place_holders/userpicture.png'
    }
    const crisUser: User = {
        username: 'darckronoz',
        image: '/place_holders/userpicture.png'
    }

type PersonKey = keyof typeof DEBT_KEYS;
    const users: { id: PersonKey; user: User }[] = [
        { id: 'santi', user: santiUser },
        { id: 'lpz', user: lpzUser },
        { id: 'cris', user: crisUser },
    ];

export default function Debt() {
    const [debts, setDebts] = useState<DebtMap>({
        santi: 0,
        lpz: 0,
        cris: 0,
    });

    const [streaks, setStreaks] = useState<DebtMap>({
        santi: 0,
        lpz: 0,
        cris: 0,
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const loadInitialData = async (keys: RedisKeyDict) => {
        const entries = await Promise.all(
            Object.entries(keys).map(async ([person, key]) => {
                const res = await fetch(`/api/debt?key=${key}`);
                const data = await res.json();
                return [person, Number(data.value?? 0)];
            })
        );
        return entries;
    }

    async function loadInitialDebtAndStreak() {
        setDebts(Object.fromEntries(await loadInitialData(DEBT_KEYS)) as DebtMap);
        setStreaks(Object.fromEntries(await loadInitialData(STREAK_KEYS)) as DebtMap);        
    }

    function updateStreakOnPageLoad() {
        const today = new Date();
        users.forEach(user => {
            // TO DO: normalizar el tipo user a lo largo de toda la app
            // TO DO: 
            // const lastCommitDate = getLastCommitDate(user.username);
            // if (lastCommitDate >= today) {
            //     //Incrementar racha en 1
            //     //Necesito una manera de no hacer llamados innecesarios 
            //     //si ya se actualizo la racha de hoy para el usuario
            //     //no hacer llamado.
            // }
        });
    }

    useEffect(()=> {
        updateStreakOnPageLoad
        loadInitialDebtAndStreak();
    }, []);

    const handleUpdateDebt = async (userId: string, debtAmount: number) => {
        const person = userId as PersonKey;
        const debtKey = DEBT_KEYS[person];
        
        if (!debtKey) {
            alert("Usuario no válido");
            return;
        }

        try {
            const response = await fetch('/api/debt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    key: debtKey, 
                    value: String(debtAmount) 
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la deuda');
            }

            // Actualizar el estado local optimistamente
            setDebts(prev => ({
                ...prev,
                [person]: debtAmount
            }));

            console.log(`Deuda actualizada para ${userId}: ${debtAmount}`);
        } catch (error) {
            console.error('Error updating debt:', error);
            alert('Error al actualizar la deuda. Por favor intenta de nuevo.');
        }
    };

    return (
        <>
        <h1 className="text-center font-bold text-3xl text-white tracking-widest">Deuda de cada uno 🤑</h1>
        <StreakGrid>
            {users.map(({ id, user }) => (
                <Streak key={id} user={user} debt={debts[id]} streak={streaks[id]} />
            ))}
        </StreakGrid>
        <PlusButton onClick={() => setIsPopupOpen(true)}/>
        <DebtUpdatePopup 
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            users={users}
            onUpdateDebt={handleUpdateDebt}
        />
        </>
    );
}
