import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Playlist } from "../../types"

interface PlaylistsState {
  items: Playlist[]
  loading: boolean
  error: string | null
}

const initialState: PlaylistsState = {
  items: [
    {
      id: "p1",
      name: "Favorites",
      songs: [],
      createdAt: Date.now(),
    },
  ],
  loading: false,
  error: null,
}

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.items.push(action.payload)
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    addSongToPlaylist: (state, action: PayloadAction<{ playlistId: string; song: any }>) => {
      const playlist = state.items.find((p) => p.id === action.payload.playlistId)
      if (playlist) {
        playlist.songs.push(action.payload.song)
      }
    },
    removeSongFromPlaylist: (state, action: PayloadAction<{ playlistId: string; songId: string }>) => {
      const playlist = state.items.find((p) => p.id === action.payload.playlistId)
      if (playlist) {
        playlist.songs = playlist.songs.filter((s) => s.id !== action.payload.songId)
      }
    },
    setPlaylistsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setPlaylistsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  setPlaylistsLoading,
  setPlaylistsError,
} = playlistsSlice.actions
export default playlistsSlice.reducer
