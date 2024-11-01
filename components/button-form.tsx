import { Button } from '@/components/ui/button'

function ButtonForm({ children, type, onClick }: { children: React.ReactNode, type: 'submit' | 'button', onClick?: () => void }) {
    return (
        <Button
            type={type}
            onClick={onClick}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-gradient to-orange-gradient via-purple-gradient focus:outline-none"
        >
            {children}
        </Button>
    )
}

export default ButtonForm