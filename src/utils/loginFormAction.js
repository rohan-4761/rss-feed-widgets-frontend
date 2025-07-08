'use client'
import { apiRoutes } from '@/constants/routes';
import { loginFormSchema } from '@/lib/loginFormSchema'
import { saveToLocalStorage } from './localStorage';

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
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields.data),
        });

        const result = await response.json();

        console.log('Login API Response:', result);

        if (result.success) {
            const userToStore = {
                    id: result.user.id,
                    user_name: result.user.user_name,
                    user_email: result.user.user_email,
            };  
            document.cookie = `token=${result.token}; Secure; SameSite=None; path=/; max-age=3600`; // Set token in cookie for 1 hour
            saveToLocalStorage('user', userToStore);
            return {
                success: true,
                message: result.message,
                user: userToStore
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
