'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Details({ params }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [selectedSprite, setSelectedSprite] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const typeColors = {
        normal: '#C4C4C4',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

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

    const typeBackgroundStyle = pokemonDetails.types.length === 1
        ? { backgroundColor: typeColors[pokemonDetails.types[0].type.name] }
        : { 
            background: `linear-gradient(90deg, ${typeColors[pokemonDetails.types[0].type.name]} 50%, ${typeColors[pokemonDetails.types[1].type.name]} 50%)`
        };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 p-12">
            <div className="flex flex-col items-center lg:w-auto w-full">
                <h2 className="text-xl text-center">#{pokemonDetails.id.toString().padStart(3, '0')}</h2>
                <h1 className="text-4xl font-bold text-center capitalize">
                    {pokemonDetails.name}
                </h1>
                <div className="mt-2 flex flex-row justify-center items-center">
                    <ul className="flex flex-row justify-center items-center gap-3">
                        {pokemonDetails.types.map((type) => (
                            <li key={type.type.name} className="capitalize">{type.type.name}</li>
                        ))}
                    </ul>
                </div>
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
                <div className="mt-8 w-full pt-10 pb-4 px-4 rounded-lg relative shadow-gray-400 shadow-md animate-hanger" style={typeBackgroundStyle}>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FEDCC8] shadow-gray-400 shadow-inner"></div>
                    <div className="grid grid-cols-2 justify-start items-start gap-4 py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-col justify-start items-end border-r -mr-2 pr-2">
                            <div className="flex flex-col justify-start items-end">
                                <h3 className="font-bold">Abilities</h3>
                                <ul className="flex flex-col justify-start items-end">
                                    {pokemonDetails.abilities.map((ability) => (
                                        <li key={ability.ability.name} className="capitalize">{ability.ability.name.replace(/-/g, ' ')}</li>
                                    ))}
                                </ul>
                            </div>                        
                            <div className="flex flex-col justify-start items-end">
                                <h3 className="font-bold">Height</h3>
                                <p className="text-center">{pokemonDetails.height / 10}m</p>
                            </div>
                            <div className="flex flex-col justify-start items-end">
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
            </div>
            <div className="flex flex-col items-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
                    Back to list
                </Link>
            </div>
        </main>
    );
}
