// services/Redis/debtService.ts
/**
 * Service for debt and streak operations with Redis
 */

export async function getDebtByKey(key: string): Promise<number> {
    try {
        const res = await fetch(`/api/debt?key=${key}`);
        const data = await res.json();
        return Number(data.value ?? 0);
    } catch (error) {
        console.error(`Error fetching debt for key ${key}:`, error);
        throw error;
    }
}

export async function updateDebtByKey(key: string, value: number): Promise<void> {
    try {
        const response = await fetch('/api/debt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                key, 
                value: String(value) 
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la deuda');
        }
    } catch (error) {
        console.error(`Error updating debt for key ${key}:`, error);
        throw error;
    }
}