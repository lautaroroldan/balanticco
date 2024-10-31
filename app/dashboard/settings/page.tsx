import { auth, signOut } from '@/auth'
import ButtonForm from '@/components/button-form'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page() {

    const session = await auth()
    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div>
            <h2>Configuración</h2>
            <p>Administra tus datos personales y de la aplicación</p>
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <ButtonForm type='submit'>Cerrar sesión</ButtonForm>
        </form>
    </div>
  )
}

export default Page