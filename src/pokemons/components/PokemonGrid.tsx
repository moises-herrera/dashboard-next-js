import { FC } from 'react';
import { SimplePokemon } from '../interfaces';
import { PokemonCard } from '.';

interface PokemonGridProps {
  pokemons: SimplePokemon[];
}

export const PokemonGrid: FC<PokemonGridProps> = ({ pokemons }) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
