import { signIn } from "@/auth"
import GoogleButton from "@/components/google-button"

export default async function LogIn() {

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
                                from-blue-gradient to-orange-gradient via-purple-gradient">
                    Balanticco
                </h1>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Inicia sesión en tu cuenta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action={async () => {
                        "use server"
                        await signIn()
                    }}>
                        <GoogleButton type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}