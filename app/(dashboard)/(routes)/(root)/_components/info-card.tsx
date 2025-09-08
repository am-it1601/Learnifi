import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"


interface InfoCardProps {
    variant?:"default" | "success"
    icon: LucideIcon;
    label: string
    numberOfItems: number

}

export const InfoCard = ({icon:Icon,label,numberOfItems,variant}:InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
            variant={variant}
            icon={Icon}
            />
            <div>
                <p className="font-medium">
                    {label}
                </p>
                <p>
                    {numberOfItems} {numberOfItems === 1 ? "Course": "Courses"}
                </p>
            </div>
        </div>
    )
}