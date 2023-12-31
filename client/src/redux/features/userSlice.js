import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    listFavorites: []
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem('token-comics');
      } else if (action.payload.token) localStorage.setItem('token-comics', action.payload.token);

      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { comicId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(e => e.comicId.toString() !== comicId.toString());
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    }
  }
});

export const {
  setUser,
  setListFavorites,
  addFavorite,
  removeFavorite
} = userSlice.actions;

export default userSlice.reducer;