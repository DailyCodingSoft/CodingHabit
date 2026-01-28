import { StreakComponentProps } from "@/types";
import Image from "next/image";

export default function Streak(props: StreakComponentProps) {
    const debt = props.debt ?? 0;
    const streak = props.streak ?? 0;

    return (
        <>
        <div className="bg-(--primary-light-color) rounded-lg text-center w-72 p-4 flex flex-col items-center">
            <Image src={props.user.image || "/place_holders/avatar.png"} alt="avatar" className="rounded-full m-5" width={100} height={100}/>
            <p>{props.user.username}</p>
            <div className="flex gap-4 mt-2">
                <p>Deuda: {debt}</p>
                <p>Racha: {streak}</p>
            </div>
        </div>
        </>
    )
}