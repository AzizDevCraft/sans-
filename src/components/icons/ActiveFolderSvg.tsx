import type { IconProps } from "@/config/types";

export default function ActiveFolderSvg (props: IconProps) {
    
    return (
        <svg 
            fill="currentColor" 
            viewBox="0 0 485 360"
            preserveAspectRatio="none"
            {...props}
        >
            <defs>
                <clipPath id="folder-clip" clipPathUnits="userSpaceOnUse">
                    <path d="M0 15.27V344.73C0 353.163 6.83659 360 15.27 360H469.73C478.163 360 485 353.163 485 344.73V62.27C485 53.8366 478.163 47 469.73 47H461L440.5 0H15.27C6.83661 0 0 6.8366 0 15.27Z"/>
                </clipPath>
            </defs>
            <path d="M0 344.73V46.839V15.27C0 6.83659 6.8366 0 15.27 0H106.233C112.215 0 117.96 2.3403 122.239 6.52054L161.286 44.6655C162.712 46.0589 164.627 46.839 166.621 46.839H469.73C478.163 46.839 485 53.6756 485 62.109V344.73C485 353.163 478.163 360 469.73 360H15.27C6.8366 360 0 353.163 0 344.73Z"/>
        </svg>
    )
}