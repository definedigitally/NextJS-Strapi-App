import { cn } from "@/lib/utils";

type BendArrowDownProps = {
    color?: string;
    className?: string;
    strokeWidth?: string;
};
export function BendArrowDown({ color, className, strokeWidth }: BendArrowDownProps) {
    return (
        <>
            <svg width="76" height="66" viewBox="0 0 76 66" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("", className)}>
                <path d="M3.00005 12.3312C18.6937 4.87863 32.7861 -0.418466 48.3794 4.42856C58.4266 7.55167 66.6398 15.7288 70.7126 25.1277C74.1199 32.991 70.7573 41.7135 68.677 50.0426C67.8902 53.1926 65.2966 56.7667 64.979 59.7181C64.8927 60.5208 72.0126 57.5673 73.3964 57.0731C73.8516 56.9106 68.0496 59.8718 66.6021 61.0983C58.7173 67.7792 64.1881 50.3937 59.9213 49.0952"
                    stroke={color ?? '#ffffff'} strokeWidth={strokeWidth ?? '5'} strokeLinecap="round" />
            </svg>
        </>
    )
}

export function Hamburger() {
    return (
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.6006 1L8.29048 1.41352C8.20895 1.41588 8.12905 1.41737 8.04749 1.4185C6.83463 1.4354 -2.99053 1.62756 2.82782 3.37037C7.23169 4.68949 15.7555 6.61424 17.2511 6.94935C17.404 6.98362 17.5511 7.01319 17.705 7.04307C18.8986 7.27481 24.3005 8.39571 21.9403 9.27219C18.5224 10.5415 4.69701 9.55442 1.51789 11.3909C-0.508962 12.5618 13.5921 12.7498 13.5921 16.7139C13.5921 18.8844 13.5921 20.9515 13.5921 20.9515" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export function SlopyCurvyArrow({ className }: { className?: string }) {
    return (
        <svg width="87" height="56" viewBox="0 0 87 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("", className)}>
            <path d="M2.67557 7.52747C9.76254 5.32319 16.6683 2.80385 24.4711 3.165C26.8481 3.27501 34.9084 3.26682 36.5905 5.52322C41.1773 11.6757 24.4535 21.2676 21.3219 23.967C13.2699 30.9076 10.9424 38.3428 24.8536 41.9874C39.8596 45.9189 59.8394 47.2209 74.7903 45.2648C78.7455 44.7474 88.0145 45.9778 80.666 42.2392C78.0276 40.8969 67.0278 35.0365 75.1196 40.3556C75.8407 40.8295 84.5896 44.9991 84.4076 45.3568C83.9671 46.2227 78.413 47.5163 77.2308 48.3826C75.1817 49.8841 73.3435 50.544 72.1839 52.8232" stroke="#222222" stroke-width="5" stroke-linecap="round" />
        </svg>
    )
}