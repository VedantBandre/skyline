import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string,
    className?: string,
    childrenClassName?: string
}

// p-3 rounded-xl bg-linear-to-br from-gray-300/60 to-gray-600 shadow-md flex flex-col gap-4

export default function Card({ children, title, childrenClassName }: Props) {
    return (
        <div className="
        p-4
        rounded-lg
        shadow-md
        bg-gradient-to-br from-zinc-800 to-zinc-900
        text-white
        flex flex-col gap-3
        transition-all duration-300
        mx-1
        2xlh-full
        ">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <div className={clsx(childrenClassName, 'animate-[fade-in_0.6s_ease-out_forwards] 2xl:flex-1 text-gray-200')}>
                {children}
            </div>
        </div>
    )
}