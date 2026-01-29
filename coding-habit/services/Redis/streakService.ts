// services/Redis/streakService.ts
/**
 * Service for streak operations with Redis
 */

export async function getStreakByKey(key: string): Promise<number> {
    try {
        const res = await fetch(`/api/debt?key=${key}`);
        const data = await res.json();
        return Number(data.value ?? 0);
    } catch (error) {
        console.error(`Error fetching streak for key ${key}:`, error);
        throw error;
    }
}

export async function updateStreakByKey(key: string, value: number): Promise<void> {
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
            throw new Error('Error al actualizar la racha');
        }
    } catch (error) {
        console.error(`Error updating streak for key ${key}:`, error);
        throw error;
    }
}
