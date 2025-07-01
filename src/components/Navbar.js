'use client'

import { useState } from 'react'
import Link from 'next/link'
import { route } from '@/constants/routes'


export default function Navbar() {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching:', search)
  }

  return (
    <nav className="ml-16 bg-white shadow-sm px-6 py-3 flex items-center justify-between z-40 relative">
      {/* Centered Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {/* Right-aligned Login Button */}
      <Link href={route["LOGIN"]}>
      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Login
      </button>
      </Link>
    </nav>
  )
}
