import type { IconProps } from "@/config/types";

export default function LoginIcon (props: IconProps) {
    return (
        <svg
            viewBox="0 0 20 20" 
            fill="currentColor" 
            {...props}
        >
            <path d="M10.833 13.3332L14.9997 9.99984L10.833 6.6665V9.1665H3.33301V10.8332H10.833V13.3332Z"/>
            <path d="M16.6667 2.5H9.16667C8.2475 2.5 7.5 3.2475 7.5 4.16667V7.5H9.16667V4.16667H16.6667V15.8333H9.16667V12.5H7.5V15.8333C7.5 16.7525 8.2475 17.5 9.16667 17.5H16.6667C17.5858 17.5 18.3333 16.7525 18.3333 15.8333V4.16667C18.3333 3.2475 17.5858 2.5 16.6667 2.5Z"/>
        </svg>
    )
}

