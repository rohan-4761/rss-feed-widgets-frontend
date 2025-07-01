'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { useState, useActionState, useEffect } from 'react';


import {signUpFormAction} from '@/utils/signUpFormAction';
import { route } from '@/constants/routes';

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signUpFormAction, "");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    if(state?.success){
      
      router.push(route["MY_WIDGETS"]);
    }
  }, [state, router])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form action={action} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Name</label>
            <input
              type="text"
              required
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
                          {state?.errors?.name && <p className='text-red-500'>{state.errors.email}</p>}

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
                {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type='password'
                required
                name="confirm_password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          Already have an account?{' '}
          <Link href={route["LOGIN"]} className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
            {state?.success && console.log(state?.message)}

    </div>
  )
}
