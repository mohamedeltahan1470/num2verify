import { z } from 'zod';

const emailSchema = z.string().email("Invalid email format");

export const validateEmail = (email) =>{
    const result = emailSchema.safeParse(email);
    if (result.success) {
        return null;
    } else {
        return error.errors[0].message;
    }
}



