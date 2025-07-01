"use server";

import {signUpFormSchema} from "@/lib/signUpFormSchema";
 

const signUpFormAction =  async (prevState, formData) => {

    const validatedFields = signUpFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password')
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const apiEndpoint = process.env.API_ENDPOINT + './signup';
    const dataToSend = { ...validatedFields.data };
    delete dataToSend.confirm_password;

    try {

        const response = await fetch( apiEndpoint,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const result  = await response.json();

        if (result.success) {
            return {
                success: true,
                message: result.message
            }
        } else {
            const responseMessage = {
                success: false,
                errorMessage: result.message || "Login failed.",
            };
            console.log(responseMessage);
            return responseMessage;
        }   
    } catch(error) {
        console.log(error)
        return {
            success : false,
            errorMessage: "An error occurred during signing you in."
        }
    }
}

export {signUpFormAction};