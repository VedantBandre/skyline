import { type ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string,
    childrenClassName?: string
}

export default function Card({ children, title, childrenClassName }: Props) {
    return (
        <div className="p-3 rounded-xl bg-cyan-300 shadow-md flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className={childrenClassName}>{children}</div>
        </div>
    )
}