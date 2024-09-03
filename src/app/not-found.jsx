'use client';

import { useState, useEffect } from 'react';
import PokemonList from '../components/pokeList';
import SearchBar from '../components/searchBar';

export default function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      const data = await response.json();
      setPokemon(data.results);
      setNextUrl(data.next);
    };
    fetchInitialData();
  }, []);

  const loadMore = async () => {
    if (!nextUrl) return;

    const response = await fetch(nextUrl);
    const data = await response.json();
    setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
    setNextUrl(data.next);
  };

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-12 gap-5">
      <SearchBar />
      <PokemonList pokemon={pokemon} />
      {nextUrl && (
        <button
          onClick={loadMore}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Load more
        </button>
      )}
      
    </main>
  );
}
