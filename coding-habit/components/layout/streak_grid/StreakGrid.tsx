import { StreakGridComponentProps } from "@/types"

export default function StreakGrid(props: StreakGridComponentProps) {
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
        <div>
            {props.streaks}
        </div>
    )
}