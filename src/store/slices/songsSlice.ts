import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Song } from "../../types"

interface SongsState {
  items: Song[]
  loading: boolean
  error: string | null
}

const initialState: SongsState = {
  items: [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synthwave",
      audioUrl: "https://example.com/audio1.mp3",
      duration: 200,
    },
    {
      id: "2",
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Disco Pop",
      audioUrl: "https://example.com/audio2.mp3",
      duration: 203,
    },
  ],
  loading: false,
  error: null,
}

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
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
      state.items = state.items.filter((s) => s.id !== action.payload)
    },
    setSongsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSongsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { addSong, updateSong, deleteSong, setSongsLoading, setSongsError } = songsSlice.actions
export default songsSlice.reducer
