import {createSlice} from '@reduxjs/toolkit';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
const isLogged = storage.getBoolean('isLogged');

const userId = storage.getString('userId');

const initialState = {
  isLogged: isLogged || false,
  userId: userId || '',
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
    setUserId: (state, action) => {
      state.userId = action.payload;
      storage.set('userId', state.userId);
    },
  },
});

export const {login, logout, setUserId} = slice.actions;

export default slice.reducer;