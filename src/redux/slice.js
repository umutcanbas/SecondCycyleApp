import {createSlice} from '@reduxjs/toolkit';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
const isLogged = storage.getBoolean('isLogged');

const favoriteListStorage = storage.getString('favoriteList');
const favoriteList = favoriteListStorage && JSON.parse(favoriteListStorage);

const initialState = {
  isLogged: isLogged || false,
  favoriteList: favoriteList || [],
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    login: state => {
      state.isLogged = true;
      storage.set('isLogged', state.isLogged);
    },
    logout: state => {
      state.isLogged = false;
      storage.set('isLogged', state.isLogged);
    },
    clearFavorites: state => {
      state.favoriteList = [];
      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
    changeFavoriteList: (state, action) => {
      const coin = action.payload;

      const isFavorite = state.favoriteList.find(item => item.id === coin.id);

      if (isFavorite) {
        state.favoriteList = state.favoriteList.filter(
          item => item.id !== coin.id,
        );
      } else {
        state.favoriteList.push(coin);
      }

      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
  },
});

export const {login, logout, changeFavoriteList, clearFavorites} =
  slice.actions;

export default slice.reducer;
