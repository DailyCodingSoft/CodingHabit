import { FormEvent } from "react";

export default function HabitForm(props: {onSubmit: (event:FormEvent<HTMLFormElement>) => void}) {
    return (
        <div className="flex justify-center">
            <form
                onSubmit={props.onSubmit}
                className="bg-[var(--surface-color)] border border-[var(--surface-border-color)] rounded-xl p-6 w-full max-w-xl shadow-2xl"
            >
                <h2 className="text-[var(--text-primary-color)] text-2xl font-semibold tracking-tight text-center mb-6">
                    Crear hábito
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Titulo del habito</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Mi Habito"
                            className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[var(--text-muted-color)] mb-2">Fecha inicial</label>
                            <input
                                name="initialDate"
                                type="text"
                                placeholder="hoy"
                                className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                            />
                        </div>

                        <div>
                            <label className="block text-[var(--text-muted-color)] mb-2">Fecha Final</label>
                            <input
                                name="endDate"
                                type="text"
                                placeholder="en 6 meses"
                                className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Valor de la deuda</label>
                        <input
                            name="debtValue"
                            type="text"
                            placeholder="$5000"
                            className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Es deuda acumulativa?:</label>
                        <input
                            name="isCumulative"
                            type="checkbox"
                            value="yes"
                            className="h-5 w-5 rounded border border-[var(--input-border-color)] bg-[var(--surface-muted-color)] text-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                    </div>
                </div>

                <div className="flex w-full gap-3 pt-6">
                    <button
                        type="submit"
                        className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="flex-1 bg-[var(--surface-border-color)] hover:bg-[var(--input-border-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}