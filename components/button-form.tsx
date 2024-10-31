import { Button } from '@/components/ui/button'

function ButtonForm({ children, type, onClick }: { children: React.ReactNode, type: 'submit' | 'button', onClick?: () => void }) {
    return (
        <Button
            type={type}
            onClick={onClick}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r 
                                from-blue-gradient to-orange-gradient via-purple-gradient
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {children}
        </Button>
    )
}

export default ButtonForm