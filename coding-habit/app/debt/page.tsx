"use client";

import { useEffect, useState } from "react";

const DEBT_KEYS = {
    santi: 'SANTI_DEBT',
    lpz: 'LPZ_DEBT',
    cris: 'CRIS_DEBT',
} as const;

type DebtMap = Record<keyof typeof DEBT_KEYS, number>;

export default function Debt() {
    //TO DO: crear un componente que muestre nombre o foto o ambas
    //y la deuda de cada uno

    //TO DO: usar los endpoints (../api/debt/route.ts)
    //  de redis para guardar y 
    //obtener la deuda de cada uno
    const [debts, setDebts] = useState<DebtMap>({
        santi: 0,
        lpz: 0,
        cris: 0,
    });

    //trabajo en progreso! no esta terminado no tocar xd
    const loadInitialDebt = async () => {
        const entries = await Promise.all(
            Object.entries(DEBT_KEYS).map(async ([person, key]) => {
                const res = await fetch(`/api/debt?key=${key}`);
                //falta data
                // falta return

            })
        );
    }

    //initial debt values
    useEffect(()=> {
        loadInitialDebt();
    }, []);

    return (
        <>
        <h1>Deuda de cada uno 🤑</h1>
        <h2></h2>
        </>
    );
}
