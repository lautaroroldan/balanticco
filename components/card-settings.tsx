import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

interface CardSettingsProps {
    image: string
    name: string
    email: string
}

function CardSettings({ image, name, email }: CardSettingsProps) {
    return (
        <div className="rounded-2xl bg-white p-6 text-black shadow flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={image} alt="Profile picture" />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-sm text-light-gray">{email}</p>
            </div>
        </div>
    )
}

export default CardSettings