"use client";


import { apiRoutes } from "@/constants/routes";
import { signUpFormSchema } from "@/lib/signUpFormSchema";

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
    const response = await fetch(apiRoutes["SIGNUP"], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (result.success) {
      document.cookie = `token=${result.token}; Secure; SameSite=None; path=/; max-age=3600`; // Set token in cookie for 1 hour
      
      return {
        success: true,
        message: result.message,
        user: {
          id: result.user.id,
          user_name: result.user.user_name,
          user_email: result.user.user_email,
        },
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
