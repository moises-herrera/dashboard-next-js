import { PokemonInfo } from '@/pokemons/components';
import { Pokemon, PokemonsResponse } from '@/pokemons/interfaces';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PokemonPageProps {
  params: { name: string };
}

// Solo se ejecuta en build time
export async function generateStaticParams() {
  const static151Pokemons: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151`
  ).then((res) => res.json());

  return static151Pokemons.results.map(({ name }) => ({ name }));
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  try {
    const { id, name } = await getPokemonByName(params.name);

    return {
      title: `#${id} - ${name}`,
      description: `Página del pokemon ${name}`,
    };
  } catch (error) {
    return {
      title: 'Pokemon no encontrado',
      description: 'El pokemon que buscas no existe',
    };
  }
}

const getPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: {
        revalidate: 60,
      },
    }).then((res) => res.json());

    return pokemon;
  } catch (error) {
    notFound();
  }
};

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await getPokemonByName(params.name);

  return <PokemonInfo pokemon={pokemon} />;
}
