"use client";

import { apiRoute } from "@/constants/routes";
import { signUpFormSchema } from "@/lib/formSchema/signUpFormSchema";
import { saveToLocalStorage } from "../localStorage";

const signUpFormAction = async (prevState, formData) => {
  const validatedFields = signUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const dataToSend = { ...validatedFields.data };
  delete dataToSend.confirm_password;

  try {
    const response = await fetch(apiRoute["SIGNUP"], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (result.success) {
      
      const authHeader = response.headers.get("Authorization")
      const token = authHeader.split(' ')[1]
      document.cookie = `token=${token}; Secure; SameSite=None; path=/; max-age=${60*60*24}`; // Set token in cookie for 1 hour
      
      const userToStore = {
          id: result.user.id,
          user_name: result.user.user_name,
          user_email: result.user.user_email,
        };
      saveToLocalStorage("user", userToStore);
      
      return {
        success: true,
        message: result.message,
        user: userToStore
      };
    } else {
      const responseMessage = {
        success: false,
        errorMessage: result.message || "Login failed.",
      };
      console.log(responseMessage);
      return responseMessage;
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorMessage: "An error occurred during signing you in.",
    };
  }
};

export { signUpFormAction };
