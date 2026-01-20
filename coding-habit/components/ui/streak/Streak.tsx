import { StreakComponentProps } from "@/types";
import Image from "next/image";

export default function Streak(props: StreakComponentProps) {
    return (
        <>
        <div>
            <Image src={props.user.image} alt="avatar" className="rounded-full"/>
            <p>{props.user.username}</p>
            <div>
                <p>deuda: {props.debt}</p>
                <p>racha: {props.streak}</p>
            </div>
        </div>
        </>
    )
}