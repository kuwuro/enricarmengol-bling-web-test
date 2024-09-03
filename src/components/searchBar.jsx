'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const searchRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/details/${query.trim().toLowerCase()}`);
    } else if (query.trim() === '') {
      searchRef.current.classList.add('animate-shake');
      searchRef.current.classList.add('border-red-500');
      searchRef.current.focus();
      setTimeout(() => {
        searchRef.current.classList.remove('animate-shake');
        searchRef.current.classList.remove('border-red-500');
      }, 800);
    }
  };

  return (
    <div className='sticky top-0 flex flex-col gap-3 lg:pt-12 pt-10 pb-6 lg:w-6/12 w-auto justify-center items-center bg-[#FEDCC8] z-10 animate-fade-in'>        
        <h2 className="text-4xl font-bold text-center">PokédexEnric</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 w-9/12 mb-6 justify-center items-center">
          <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a Pokémon..."
              className="border border-gray-300 p-2 rounded-md w-80 transition-colors duration-200 focus:outline-none"
          />
          <button
              type="submit"
              className="bg-blue-500 lg:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
              Search
          </button>
        </form>
    </div>
  );
}
