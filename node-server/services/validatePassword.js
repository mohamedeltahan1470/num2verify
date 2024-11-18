import { z } from 'zod';

const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" })
                            .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })


export const validatePassword = (password) => {
    try{
        passwordSchema.parse(password);
        return null;
    } catch(error) {
        return error.errors[0].message;
    }
};