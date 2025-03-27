"use client"

import { useEffect, useRef } from "react"

interface CursorFollowerProps {
    position: { x: number; y: number }
}

export default function CursorFollower({ position }: CursorFollowerProps) {
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cursorRef.current) return

        // Apply smooth animation to the cursor follower
        cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }, [position])

    return (
        <div
            ref={cursorRef}
            className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 -ml-2 -mt-2"
            style={{
                transition: "transform 0.1s ease-out",
            }}
        />
    )
}

