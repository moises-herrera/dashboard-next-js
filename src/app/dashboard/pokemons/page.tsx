import { PokemonGrid } from '@/pokemons/components';
import { SimplePokemon, PokemonsResponse } from '@/pokemons/interfaces';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '151 Pokemons',
  description: 'Listado de los 151 pokemons originales',
};

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons: SimplePokemon[] = data.results.map(({ url, name }) => ({
    id: url.split('/').at(-2) as string,
    name,
  }));

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokemons <small className="text-blue-500">estático</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
