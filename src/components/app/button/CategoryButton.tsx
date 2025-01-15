import React from 'react'

type Props = {
    name: string;
    icon: React.ReactNode;
    selected: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function CategoryButton({
    name,
    onClick,
    selected,
    icon
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`w-[98px] px-4 py-4 rounded-lg flex flex-col items-center transition-colors hover:bg-gray-100 ${
              selected ? "bg-gray-100 font-medium" : ""
            }`}
          >
            {icon}
            <span>{name}</span>
        </button>
    )
}
