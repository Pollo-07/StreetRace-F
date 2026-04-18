
    import { z } from "zod";

  export const LoginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});


  export const RegisterSchema = z.object({
    userName: z.string()
                 .min(3, { message: "Muy corto" })
                  .max(20, { message: "Muy largo" })
                  .regex(/^[a-zA-Z0-9_]+$/, {
                  message: "Solo letras, números y _",
                }).trim().toLowerCase(),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  tipo_categoria: z.string().min(1, {
  message: "Debes seleccionar una opción",
}),
protocol: z.boolean().refine(val => val === true, {
  message: "Debes aceptar el protocolo",
})

});