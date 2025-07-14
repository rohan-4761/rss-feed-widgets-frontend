'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useActionState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {route} from '@/constants/routes'
import { loginFormAction } from '@/utils/loginFormAction'
import { setUser } from '@/lib/features/userSlice'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  const [state, action, isPending] = useActionState(loginFormAction, "");
  const dispatch = useDispatch();
  
  useEffect(() => {

      if (state?.success) {
        // Set user data in Redux store
        dispatch(setUser(state.user));
        
        router.push(route["MY_WIDGETS"]);
      }
  }, [state, router])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form action = {action} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              defaultValue={state?.formData?.email ?? ""}
            />
          </div>
                {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              {state?.errors?.password && (
                  <div>
                    <p className='text-red-500'>Password must:</p>
                    <ul>
                      {state.errors.password.map((error) => (
                        <li className='text-red-500' key={error}>- {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? 'Hide' : 'Show'}
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
          <Link href={route["SIGNUP"]} className="text-blue-500 hover:underline">
            Don't have an account? Sign up
          </Link>
          <Link href={route["FORGOT_PASSWORD"]} className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
      {state?.success && console.log(state?.message)}
    </div>
  )
}
