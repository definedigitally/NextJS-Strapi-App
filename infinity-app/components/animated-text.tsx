"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface AnimatedTextProps {
    text: string
    className?: string
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Setup canvas font and size
    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const updateCanvasSize = () => {
            const rect = container.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height

            const textEl = container.querySelector("div")
            if (!textEl) return

            const textStyles = window.getComputedStyle(textEl)
            const fontSize = textStyles.fontSize
            const fontWeight = textStyles.fontWeight
            const fontFamily = textStyles.fontFamily

            ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`
            ctx.textBaseline = "top"
            ctx.textAlign = "left"
        }

        updateCanvasSize()
        window.addEventListener("resize", updateCanvasSize)
        return () => window.removeEventListener("resize", updateCanvasSize)
    }, [])

    // Animation logic
    useEffect(() => {
        if (!canvasRef.current || !hoverPosition || !isHovered || hasAnimated || !containerRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const textEl = containerRef.current.querySelector("div")
        if (!textEl) return

        const textRect = textEl.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        const offsetX = textRect.left - containerRect.left
        const offsetY = textRect.top - containerRect.top

        let animationFrame: number
        let radius = 0
        const maxRadius = Math.max(canvas.width, canvas.height) * 1.5
        const speed = 15

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.save()
            ctx.beginPath()
            ctx.arc(hoverPosition.x, hoverPosition.y, radius, 0, Math.PI * 2)
            ctx.clip()

            ctx.fillStyle = "#e53e3e"
            ctx.fillText(text, offsetX, offsetY)

            ctx.restore()

            radius += speed
            if (radius < maxRadius) {
                animationFrame = requestAnimationFrame(animate)
            } else {
                ctx.fillStyle = "#e53e3e"
                ctx.fillText(text, offsetX, offsetY)
                setHasAnimated(true) // ✅ Only after animation completes
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [hasAnimated, hoverPosition, isHovered, text])

    // Reset on hover leave
    useEffect(() => {
        if (!isHovered && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d")
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            }
            setHasAnimated(false)
        }
    }, [isHovered])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (hasAnimated) return // ✅ Skip if already animated
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        setHoverPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setIsHovered(false)
                setHoverPosition(null)
            }}
        >
            {/* Base text */}
            <div className="relative z-10 pointer-events-none">{text}</div>

            {/* Canvas overlay */}
            <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
        </div>
    )
}
