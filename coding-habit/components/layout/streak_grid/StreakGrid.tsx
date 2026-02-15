import { StreakGridComponentProps } from "@/types"

export default function StreakGrid({children}: StreakGridComponentProps) {

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center mt-6">
            {children}
        </div>
    )
}