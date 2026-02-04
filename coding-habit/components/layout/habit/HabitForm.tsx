

export default function HabitForm() {
        
    return (
        <div>

            <form>
                <label>Titulo del habito</label>
                <input type="text" placeholder="Mi Habito"/>
                
                <label>Fecha inicial</label>
                <input type="text" placeholder="hoy"/>

                <label>Fecha Final</label>
                <input type="text" placeholder="en 6 meses"/>

                <label>Valor de la deuda</label>
                <input type="text" placeholder="$5000"/>

                <label>Es deuda acumulativa?:</label>
                <input type="text" placeholder="si *checkbox*"/>

                <label>Usuarios</label>
                {/**aqui va un creador de usuarios con un mas donde 
                 * un click crea un usuario pide un nombre
                 * y depronto un icono
                 */}
            </form>
        </div>
    )
}