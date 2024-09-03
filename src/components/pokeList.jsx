"use client";

import { useRouter } from "next/navigation";

export default function PokemonList({ pokemon }) {
  const router = useRouter();

  if (!pokemon.length) {
    return (
        <h2 className="text-xl font-bold opacity-40">Loading...</h2>
    );
}

  return (
    <div className="grid lg:grid-cols-5 grid-cols-3 gap-6">
      {pokemon.map((poke, index) => (
        <div
          key={poke.name}
          className="text-md flex justify-center items-center animate-fade-in bg-white rounded-lg shadow-md group"
          style={{ animationDelay: `${(index % 20) * 20}ms` }}
        >
          <button
            onClick={() => router.push(`/details/${poke.name}`)}
            className="capitalize w-full flex flex-col items-center p-2 group-hover:bg-gray-200 rounded-lg transition-colors duration-200"
            title={poke.name}
          >
            <img src={poke.sprite} alt={poke.name} className="w-16 h-16" />
            <span className="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[85px]">
              {poke.name.replace(/-/g, " ")}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
