'use client';

import { useRouter } from 'next/navigation';

export default function PokemonList({ pokemon }) {
  const router = useRouter();

  return (
    <div className="grid lg:grid-cols-4 grid-cols-3 gap-8">
        {pokemon.map((poke, index) => (
            <div key={poke.name} className="text-md flex items-center">
                <button
                    onClick={() => router.push(`/details/${poke.name}`)}
                    className="capitalize hover:underline overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[85px] animate-fade-in"
                    title={poke.name}
                    style={{ animationDelay: `${(index % 20) * 20}ms` }}
                >
                    {poke.name}
                </button>
            </div>
        ))}
    </div>
  );
}
