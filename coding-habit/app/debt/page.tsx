"use client";

import { useEffect, useState } from "react";
import {User, DebtEntry, StreakEntry} from '../../types/index'
import StreakGrid from "@/components/layout/streak_grid/StreakGrid";
import Streak from "@/components/ui/streak/Streak";
import PlusButton from "@/components/ui/plus-button/PlusButton";
import DebtUpdatePopup from "@/components/layout/popup/DebtUpdatePopup";
import { getDebtByKey, updateDebtByKey } from "@/services/Redis/debtService";

//crear estos con DB @lpzzzzzzz
const lpzUser: User = {
    username: 'elepezeta',
    debtkey: 'LPZ_DEBT',
    streakkey: 'LPZ_STREAK',
}
const santiUser: User = {
    username: 'hacktiago',
    debtkey: 'SANTI_DEBT',
    streakkey: 'SANTI_STREAK',
}
const crisUser: User = {
    username: 'darckronoz',
    debtkey: 'CRIS_DEBT',
    streakkey: 'CRIS_STREAK',
}

export default function Debt() {
    const users: User[] = [santiUser, lpzUser, crisUser]; //Con el contexto (reto) se sabra cuantos usuarios y cuales.
    const debtsEntries: DebtEntry[] = users.map(user => ({
        debtKey: user.debtkey || '',
        value: 0,
    }));
    const streaksEntries: StreakEntry[] = users.map(user => ({
        streakKey: user.streakkey || '',
        value: 0,
    }));
    const [debts, setDebts] = useState<DebtEntry[]>(debtsEntries);
    const [streaks, setStreaks] = useState<StreakEntry[]>(streaksEntries);

    function loadDebts() {
        users.forEach(async (user) => {
            if (user.debtkey) {
                const debtValue = await getDebtByKey(user.debtkey);
                setDebts((prevDebts) => {
                    const updatedDebts = prevDebts.map((debt) =>
                        debt.debtKey === user.debtkey ? { ...debt, value: debtValue } : debt
                    );
                    return updatedDebts;
                });
            }
        });
    }

    function loadStreaks() {
        users.forEach(async (user) => {
            if (user.streakkey) {
                const streakValue = await getDebtByKey(user.streakkey);
                setStreaks((prevStreaks) => {
                    const updatedStreaks = prevStreaks.map((streak) =>
                        streak.streakKey === user.streakkey ? { ...streak, value: streakValue } : streak
                    );
                    return updatedStreaks;
                });
            }
        });
    }
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function updateStreakOnPageLoad() {
        const today = new Date();
        users.forEach(user => {
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
        loadDebts();
        loadStreaks();
        updateStreakOnPageLoad();
    }, []);

    const handleUpdateDebt = async (userId: string, debtAmount: number) => {
        //TO DO: implementar esto usando el servicio de redis.
    };

    return (
        <>
        <h1 className="text-center font-bold text-3xl text-white tracking-widest">Deuda de cada uno 🤑</h1>
        <StreakGrid>
            {users.map((user) => {
                const debtEntry = debts.find(debt => debt.debtKey === user.debtkey);
                const streakEntry = streaks.find(streak => streak.streakKey === user.streakkey);
                return (
                    <Streak 
                        key={user.username} 
                        user={user} 
                        debt={debtEntry ? debtEntry.value : 0} 
                        streak={streakEntry ? streakEntry.value : 0} 
                    />
                );
            })}
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
