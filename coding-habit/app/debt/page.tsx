"use client";

import { useEffect, useState } from "react";
import {RedisKeyDict} from '../../types/index'

const initialDate = ''//fecha inicial para calcular la racha perfecta.
//es la fecha del primer commit del reto

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

export default function Debt() {
    //TO DO: crear un componente que muestre nombre o foto o ambas
    //y la deuda de cada uno

    //TO DO: usar los endpoints (../api/debt/route.ts)
    //de redis para guardar
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

    useEffect(()=> {
        loadInitialDebtAndStreak();
    }, []);

    return (
        <>
        <h1>Deuda de cada uno 🤑</h1>
        <p>Santi debe: {debts.santi} y tiene una racha de {streaks.santi} dias!</p>
        <p>Cris debe: {debts.cris} y tiene una racha de {streaks.cris} dias!</p>
        <p>Lpz debe: {debts.lpz} y tiene una racha de {streaks.lpz} dias!</p>
        </>
    );
}
