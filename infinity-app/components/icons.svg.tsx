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