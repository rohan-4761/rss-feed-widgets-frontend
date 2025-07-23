"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { route } from "@/constants/routes";
import { loginFormAction } from "@/utils/formActions/loginFormAction";
import { setUser } from "@/lib/features/userSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, formAction] = useActionState(loginFormAction, "");

  const handleSubmit = async (formData) => {
    toast.loading("Logging you in...", { toastId: "login-toast" });
    formAction(formData); 
  };

  useEffect(() => {
    if (state?.success) {
      toast.update("login-toast", {
        render: `${state.user.user_name} successfully logged in.`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
      dispatch(setUser(state.user));
      router.push(route["HOME"]);
    } else if (state?.errorMessage) {
      toast.update("login-toast", {
        render: state.errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
    } else if (state?.errors) {
      toast.dismiss("login-toast");
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* 👇 use formData and handleSubmit manually */}
        <form
          action={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              defaultValue={state?.formData?.email ?? ""}
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {state?.errors?.password && (
                <div>
                  <p className="text-red-500">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li className="text-red-500" key={error}>
                        - {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <Link
            href={route["SIGNUP"]}
            className="text-blue-500 hover:underline"
          >
            Don't have an account? Sign up
          </Link>
          <Link
            href={route["FORGOT_PASSWORD"]}
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
