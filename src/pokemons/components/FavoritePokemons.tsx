'use client';

import { useAppSelector } from '@/store';
import { PokemonGrid } from '.';
import { IoHeartOutline } from 'react-icons/io5';

export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector(({ pokemons }) =>
    Object.values(pokemons.favorites)
  );

  return favoritePokemons.length ? (
    <PokemonGrid pokemons={favoritePokemons} />
  ) : (
    <NoFavorites />
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
