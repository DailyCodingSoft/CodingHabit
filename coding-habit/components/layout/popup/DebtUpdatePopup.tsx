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
            <div className="bg-[var(--surface-color)] rounded-xl p-6 w-[22rem] shadow-2xl border border-[var(--surface-border-color)] relative z-[60]">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-[var(--text-primary-color)] text-2xl font-semibold tracking-tight">
                        Update {user.username} debt
                    </h2>

                    <div className="w-full">
                        <label htmlFor="debt-input" className="block text-[var(--text-muted-color)] mb-2">
                            Debt amount
                        </label>
                        <input
                            id="debt-input"
                            type="number"
                            value={debtAmount}
                            onChange={(e) => setDebtAmount(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] text-center text-lg border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="0"
                        />
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            Update
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-[var(--surface-border-color)] hover:bg-[var(--input-border-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
