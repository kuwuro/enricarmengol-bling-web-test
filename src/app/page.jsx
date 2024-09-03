'use client';

import { useState, useEffect } from 'react';
import PokemonList from '../components/pokeList';
import SearchBar from '../components/searchBar';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      const data = await response.json();
      
      const detailedPokemon = await Promise.all(
        data.results.map(async (poke) => {
          const pokeDetails = await fetch(poke.url);
          const pokeData = await pokeDetails.json();
          return { ...poke, sprite: pokeData.sprites.front_default };
        })
      );

      setPokemon(detailedPokemon);
      setNextUrl(data.next);
    };

    fetchInitialData();
  }, []);

  const loadMore = async () => {
    if (!nextUrl || loading) return;

    setLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (poke) => {
          const pokeDetails = await fetch(poke.url);
          const pokeData = await pokeDetails.json();
          return { ...poke, sprite: pokeData.sprites.front_default };
        })
      );

      setPokemon((prevPokemon) => [...prevPokemon, ...detailedPokemon]);
      setNextUrl(data.next);
    } catch (error) {
      console.error("Failed to load more Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-20 p-12 gap-5 font-dmsans">
      <SearchBar />
      <PokemonList pokemon={pokemon} />
      {nextUrl && (
        <button
          onClick={loadMore}
          disabled={loading}
          className={`bg-blue-500 ${loading ? 'bg-blue-300 cursor-default' : 'lg:hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded mt-8 transition-colors duration-200`}
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </main>
  );
}
