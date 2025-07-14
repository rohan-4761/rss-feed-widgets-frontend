
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="ml-16 mt-16">
      <Navbar />
      
        <Sidebar />
      <main className="p-4">{children}</main>
    </ div>
  );
}
