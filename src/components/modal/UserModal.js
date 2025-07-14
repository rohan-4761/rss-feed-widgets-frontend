"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { clearUser } from "@/lib/features/userSlice";
import { route } from "@/constants/routes";

export default function UserModal({ isOpen, onClose }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0; path=/; SameSite=None; Secure";
    onClose();
    setTimeout(() => {
      router.push(route["LOGIN"]);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">User Details</h2>

        <div className="mb-4">
          <p>
            <strong>Name:</strong> {user.user_name}
          </p>
          <p>
            <strong>Email:</strong> {user.user_email}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
