import { auth, signOut } from '@/auth'
import ButtonForm from '@/components/button-form'
import CardSettings from '@/components/card-settings'
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page() {

    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div className='flex flex-col gap-6'>
            <h1 className="text-base font-semibold mt-12">Configuración</h1>

            <CardSettings name={session.user.name ?? ''} email={session.user.email ?? ''} image={session.user.image ?? ''} />

            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <ButtonForm type='submit'><LogOut className="h-5 w-5" />
                    <span className="font-medium">Cerrar sesión</span></ButtonForm>
            </form>
        </div>
    )
}

export default Page