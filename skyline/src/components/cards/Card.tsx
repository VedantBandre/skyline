import { type ReactNode } from "react";

type Props = {
    children: ReactNode,
    title: string
}

export default function Card({ children, title }: Props) {
    return (
        <div className="p-4 rounded-x1 bg-zinc-900 shadow-md flex flex-col gap-4">
            <h2 className="text-2x1 font-semibold">{title}</h2>
            <div>{children}</div>
        </div>
    )
}