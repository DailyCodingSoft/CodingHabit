"use client";

import { useState } from "react";
import Modal from "../modal/model";
import { User } from "@/types";

type DebtUpdatePopupProps = {
    isOpen: boolean;
    onClose: () => void;
    users: User[];
    onUpdateDebt: (userId: string, debtAmount: number) => void;
}

export default function DebtUpdatePopup({ isOpen, onClose, users, onUpdateDebt }: DebtUpdatePopupProps) {
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [debtAmount, setDebtAmount] = useState<number>(0);

    const handleSubmit = () => {
        if (!selectedUserId) {
            alert("Por favor selecciona un usuario");
            return;
        }
        
        onUpdateDebt(selectedUserId, debtAmount);
        setSelectedUserId("");
        setDebtAmount(0);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-xl relative z-[60]">
                <h2 className="text-white text-xl font-bold mb-4">Actualizar Deuda</h2>
                
                <div className="mb-4">
                    <label htmlFor="user-select" className="block text-white mb-2">
                        Seleccionar Usuario:
                    </label>
                    <select
                        id="user-select"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">-- Selecciona un usuario --</option>
                        {users.map(({ username }) => (
                            <option key={username} value={username}>
                                {username}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="debt-input" className="block text-white mb-2">
                        Cantidad de Deuda:
                    </label>
                    <input
                        id="debt-input"
                        type="number"
                        value={debtAmount}
                        onChange={(e) => setDebtAmount(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                        placeholder="Ingresa la cantidad"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                        Actualizar
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
