import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Song } from "../../types"

interface SongsState {
  items: Song[]
  loading: boolean
  error: string | null
  searchQuery: string
}

const initialState: SongsState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: "",
}

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.loading = true
      state.error = null
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.items = action.payload
      state.loading = false
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.items.push(action.payload)
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.items.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((s) => s.id !== action.payload)
      state.loading = false
    },
    setSongsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSongsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    createSong: (state, action: PayloadAction<Song>) => {
      state.loading = true
      state.error = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { fetchSongs, setSongs, createSong, addSong, updateSong, deleteSong, deleteSongSuccess, setSongsLoading, setSongsError, setSearchQuery } = songsSlice.actions
export default songsSlice.reducer
