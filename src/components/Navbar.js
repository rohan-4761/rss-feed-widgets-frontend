"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SquareArrowUpRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import UserModal from "./modal/UserModal";
import { route } from "@/constants/routes";
import { handleFeeds } from "@/utils/handleFeeds";

export default function Navbar() {
  const [hasMounted, setHasMounted] = useState(false);
  


  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  
  useEffect(() => {
    const fetchArticles = async () => {
      if (!search.trim()) {
        setArticles([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const articles = await handleFeeds({ search });
        setArticles(articles.slice(0, 5)); // limit to top 5
        setShowDropdown(true);
      } catch (err) {
        setError("Error fetching articles: " + err.message);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchArticles, 300); // debounce input

    return () => clearTimeout(timeoutId);
  }, [search]);
  
  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    // Ensure the component has mounted before setting state
    setHasMounted(true);
  }, []);
  // If the component has not mounted, return null to avoid rendering
  if (!hasMounted) {
    return null;
  }
  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between z-40 fixed top-0 w-full">
      <div className="flex-1 w-10/12 mx-auto relative" ref={dropdownRef}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-3/4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => {
            if (articles.length > 0) setShowDropdown(true);
          }}
        />

        {showDropdown && articles.length > 0 && (
          <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex w-full px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
              >
                {article.title.length > 70
                  ? article.title.slice(0, 70) + "..."
                  : article.title}
                <Link
                  href={article.link}
                  key={article.id}
                  target="_blank"
                  className="text-blue-600 ml-3"
                  rel="noopener noreferrer"
                >
                  <SquareArrowUpRight />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {!user.isLoggedIn ? (
        <button
          onClick={() => router.push(route["LOGIN"])}
          className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      ) : (
        <>
          <button
            className="mr-20 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            {user?.user?.user_name[0] || "Guest"}
          </button>
          <UserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </nav>
  );
}
