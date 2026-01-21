import { StreakGridComponentProps } from "@/types"

export default function StreakGrid({children}: StreakGridComponentProps) {
    //TO DO: grid de usuarios donde el tamano es 
    //responsive dependiendo de la cantidad de
    //usuarios
    //dos usuarios uno al lado del otro
    //3 usuarios en horizontal
    //4 usuarios cuadro dos arriba dos abajo
    //5 usuarios cuadro dos arriba 3 abajo
    //6 usuarios cuadro tres arriba tres abajo
    //7 usuarios cuadro tres arriba cuatro abajo
    //8 usuarios cuadro cuatro abajo cuatro arriba
    //esto es para desktop
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center mt-6">
            {children}
        </div>
    )
}