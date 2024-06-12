import { ZodType, z } from "zod";


export type UserRegistrationProps = {
    type: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
}

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
    .object({
        type: z.string().min(1),
        name: z
            .string()
            .min(4, { message: 'Your full name must be at least 4 characters long' }),
        email: z.string().email({ message: 'Incorrect email format' }),
        password: z
            .string()
            .min(8, { message: 'Your password must be at least 8 characters long' })
            .max(64, { message: 'Your password cannot be longer than 64 characters' })
            .refine(
                (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
                'Password should contain only alphabets and numbers'
            ),
        confirmPassword: z.string(),
        otp: z.string().min(6, { message: 'You must enter a 6-digit code' }),
    })
    .refine((schema) => schema.password === schema.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
    .superRefine((data) => {
        if (!data.password || !data.confirmPassword) {
            return { message: 'Please enter password and confirmation' }; // Combined error
        }
        // Return true if both password and confirmPassword are valid
        return true;
    })


export type UserLoginProps = {
    email: string;
    password: string;
}

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z.string().min(8, { message: 'Your password must be at least 8 characters long' }),
})