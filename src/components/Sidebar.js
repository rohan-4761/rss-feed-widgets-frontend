'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, List } from 'lucide-react'
import { route } from '@/constants/routes'

const menuItems = [
  { name: 'Home', href: route["HOME"], icon: <LayoutDashboard size={20} /> },
  { name: 'My Widgets', href: route["MY_WIDGETS"], icon: <Package size={20} /> },
  { name: 'Create Widgets', href: route["CREATE_WIDGETS"], icon: <List size={20} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="group fixed top-0 left-0 h-full z-50">
      <div className="bg-gray-900 text-white h-full transition-all duration-300 ease-in-out w-16 group-hover:w-64 shadow-lg overflow-hidden">
        <div className="flex flex-col items-start pt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center w-full px-4 py-3 space-x-3 transition-colors
                  ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}
                `}
              >
                <div className="min-w-[20px]">{item.icon}</div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
