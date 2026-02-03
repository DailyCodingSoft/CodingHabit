"use client";

import { useState } from "react";
import Modal from "../modal/model";
import { User } from "@/types";

type DebtUpdatePopupProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onUpdateDebt: (userId: string, debtAmount: number) => void;
}

export default function DebtUpdatePopup({ isOpen, onClose, user, onUpdateDebt }: DebtUpdatePopupProps) {
    const [debtAmount, setDebtAmount] = useState<string>("");

    const handleSubmit = () => {
        onUpdateDebt(user.username, Number(debtAmount) || 0);
        setDebtAmount("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-gray-800 rounded-xl p-6 w-[22rem] shadow-2xl border border-gray-700 relative z-[60]">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-white text-2xl font-semibold tracking-tight">
                        Update {user.username} debt
                    </h2>

                    <div className="w-full">
                        <label htmlFor="debt-input" className="block text-white/80 mb-2">
                            Debt amount
                        </label>
                        <input
                            id="debt-input"
                            type="number"
                            value={debtAmount}
                            onChange={(e) => setDebtAmount(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700/80 text-white text-center text-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="0"
                        />
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            Update
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
