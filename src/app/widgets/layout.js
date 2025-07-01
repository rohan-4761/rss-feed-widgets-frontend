import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
