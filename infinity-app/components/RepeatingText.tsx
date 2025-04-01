import React from "react";

interface RepeatingTextProps {
    text: string;
    isActive: boolean;
    wordInLine: string;
}

export default function RepeatingText({ text, isActive, wordInLine }: RepeatingTextProps) {
    const repeatedTexts = Array(6).fill(text);
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="flex items-center justify-center gap-[34px] opacity-10">
                {repeatedTexts.map((item, index) => (
                    <span
                        key={index}
                        className={`text-4xl md:text-6xl lg:text-7xl font-bold mx-2 ${isActive && item === wordInLine ? "text-red-500 fill-mode" : "text-gray-200"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};