'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Details({ params }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [selectedSprite, setSelectedSprite] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.entry}`);
                if (!response.ok) {
                    setNotFound(true);
                    return;
                }
                const data = await response.json();
                console.log(data);
                setPokemonDetails(data);
                setSelectedSprite(data.sprites.other["official-artwork"].front_default);
            } catch (error) {
                console.error("Failed to fetch Pokémon details:", error);
                setNotFound(true);
            }
        };
        fetchPokemonDetails();
    }, [params.entry]);

    if (notFound) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 p-12">
                <h1 className="text-4xl font-bold text-center mb-4">Pokémon Not Found</h1>
                <p className="text-lg text-center mb-8">
                    The Pokémon "{params.entry}" doesn't exist.<br/>Please check the name and try again.
                </p>
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to list
                </Link>
            </main>
        );
    }

    if (!pokemonDetails) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </main>
        );
    }

    const spriteImages = [
        pokemonDetails.sprites.other["official-artwork"].front_default,
        pokemonDetails.sprites.other["official-artwork"].front_shiny,
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 p-12">
            <div className="flex flex-col items-center lg:w-auto w-full">
                <h1 className="text-4xl font-bold text-center capitalize">
                    {pokemonDetails.name}
                </h1>
                <h2 className="text-xl text-center">#{pokemonDetails.id.toString().padStart(3, '0')}</h2>
                <div className="flex flex-col items-center">
                    <img
                        src={selectedSprite}
                        alt={pokemonDetails.name}
                        className="w-52 h-52 my-4"
                    />
                    <div className="flex gap-2">
                        {spriteImages.map((sprite, index) => (
                            <img
                                key={index}
                                src={sprite}
                                alt={`${pokemonDetails.name} sprite ${index}`}
                                className={`w-20 h-20 cursor-pointer border-2 rounded-2xl ${selectedSprite === sprite ? 'border-black' : 'border-transparent'}`}
                                onClick={() => setSelectedSprite(sprite)}
                            />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8 w-full gap-4 bg-white pt-10 pb-4 lg:px-6 px-2 rounded-lg relative shadow-gray-400 shadow-md animate-hanger">    
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FEDCC8] shadow-gray-400 shadow-inner"></div>               
                    <div className="flex flex-col justify-start items-end">
                        <div className="flex flex-col justify-start items-end">
                            <h3 className="font-bold">Type</h3>
                            <ul className="flex flex-col justify-start items-end">
                                {pokemonDetails.types.map((type) => (
                                    <li key={type.type.name} className="capitalize">{type.type.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col justify-start items-end">
                            <h3 className="font-bold">Abilities</h3>
                            <ul className="flex flex-col justify-start items-end">
                                {pokemonDetails.abilities.map((ability) => (
                                    <li key={ability.ability.name} className="capitalize">{ability.ability.name.replace(/-/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>                        
                        <div className="flex flex-row justify-center items-center gap-3">
                            <h3 className="font-bold">Height</h3>
                            <p className="text-center">{pokemonDetails.height / 10}m</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-3">
                            <h3 className="font-bold">Weight</h3>
                            <p className="text-center">{pokemonDetails.weight / 10}kg</p>
                        </div>                        
                    </div>
                    <div>
                        <h3 className="font-bold">Stats</h3>
                        <ul>
                            {pokemonDetails.stats.map((stat) => (
                                <li key={stat.stat.name} className="capitalize">
                                    {stat.stat.name.replace(/-/g, ' ').replace(/Special/i, 'Sp.').replace(/Hp/i, 'HP')}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                    Back to list
                </Link>
            </div>
        </main>
    );
}
