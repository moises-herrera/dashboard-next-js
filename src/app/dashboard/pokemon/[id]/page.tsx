import { PokemonInfo } from '@/pokemons/components';
import { Pokemon } from '@/pokemons/interfaces';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PokemonPageProps {
  params: { id: string };
}

// Solo se ejecuta en build time
export async function generateStaticParams() {
  const static151Pokemons = Array.from({ length: 151 }, (_, i) => i + 1).map(
    (id) => `${id}`
  );

  return static151Pokemons.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  try {
    const { id, name } = await getPokemonById(params.id);

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

const getPokemonById = async (id: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
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
  const pokemon = await getPokemonById(params.id);

  return <PokemonInfo pokemon={pokemon} />;
}
