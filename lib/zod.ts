import { z } from "zod"
export const loginSchema = z.object({
    email: z.string({ required_error: "El correo electrónico es requerido" })
        .email("El correo electrónico no es válido")
        .min(1, { message: "El correo electrónico es requerido" }),
    password: z.string({ required_error: "La contraseña es requerida" })
        .min(1, { message: "La contraseña es requerida" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(12, { message: "La contraseña no puede tener más de 12 caracteres" })
})