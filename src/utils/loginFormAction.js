'use server'

import { apiRoutes } from '@/constants/routes';
import { loginFormSchema } from '@/lib/loginFormSchema' 

export const loginFormAction = async (prevState, formData) => {
    const validatedFields = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }


    try {
        const response = await fetch(apiRoutes['LOGIN'], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify(validatedFields.data),
        });

        const result = await response.json();

        console.log('Login API Response:', result);

        if (result.success) {
            return {
                success: true,
                message: result.message,
            };

        } else {
            return {
                success: false,
                errorMessage: result.message || 'Login failed',
            };
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return {
            success: false,
            errorMessage: 'An error occurred during login.',
        };
    }
};
