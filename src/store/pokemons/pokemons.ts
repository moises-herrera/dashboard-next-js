import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/pokemons/interfaces';

interface FavoritePokemons {
  [key: string]: SimplePokemon;
}

interface PokemonsState {
  favorites: FavoritePokemons;
}

const initialState: PokemonsState = {
  favorites: {},
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setFavoritePokemons: (state, action: PayloadAction<FavoritePokemons>) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = pokemon;
      }

      localStorage.setItem(
        'favorite-pokemons',
        JSON.stringify(state.favorites)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleFavorite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
