"use client";
import { apiRoute } from "@/constants/routes";
import { loginFormSchema } from "@/lib/formSchema/loginFormSchema";
import { saveToLocalStorage } from "@/utils/localStorage";

export const loginFormAction = async (prevState, formData) => {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(apiRoute["LOGIN"], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    console.log("Login API Response:", result);

    if (result.success) {
      const userToStore = {
        id: result.user.id,
        user_name: result.user.user_name,
        user_email: result.user.user_email,
      };
      const authHeader = response.headers.get("Authorization")
      const token = authHeader.split(' ')[1]
      document.cookie = `token=${token}; Secure; SameSite=None; path=/; max-age=${60*60*24}`; // Set token in cookie for 1 hour
      saveToLocalStorage("user", userToStore);
      return {
        success: true,
        message: result.message,
        user: userToStore,
      };
    } else {
      return {
        success: false,
        errorMessage: result.message || "Login failed",
      };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      errorMessage: "An error occurred during login.",
    };
  }
};
