import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string,
    childrenClassName?: string
}

// p-3 rounded-xl bg-linear-to-br from-gray-300/60 to-gray-600 shadow-md flex flex-col gap-4

export default function Card({ children, title, childrenClassName }: Props) {
    return (
        <div className="
        p-3 
        rounded-s 
        /* Glassmorphism effects */
        bg-zinc-900/70 
        dark:bg-zinc-900/60 
        /* backdrop-blur-xl  */
        /* Subtle border to catch light */
        border border-dark:none
        /* Soft, deep shadow */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] 
        flex flex-col gap-3
        transition-all duration-300
        mx-1
        ">
            <h2 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white/90">{title}</h2>
            {/* <div className={`text-gray-700 dark:text-gray-300 ${childrenClassName}`}> */}
            <div className={clsx(childrenClassName, 'animate-[fade-in_0.6s_ease-out_forwards] text-gray-700 dark:text-gray-300')}>
                {children}
            </div>
        </div>
    )
}