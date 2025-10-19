import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface StatsState {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsInGenre: { _id: string; count: number }[]
  songsByArtist: { _id: string; count: number }[]
  albumsByArtist: { _id: string; count: number }[]
  songsInAlbum: { _id: string; count: number }[]
  loading: boolean
  error: string | null
}

const initialState: StatsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsInGenre: [],
  songsByArtist: [],
  albumsByArtist: [],
  songsInAlbum: [],
  loading: false,
  error: null,
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStats: (state) => {
      state.loading = true
      state.error = null
    },
    setStats: (state, action: PayloadAction<Omit<StatsState, 'loading' | 'error'>>) => {
      state.totalSongs = action.payload.totalSongs
      state.totalArtists = action.payload.totalArtists
      state.totalAlbums = action.payload.totalAlbums
      state.totalGenres = action.payload.totalGenres
      state.songsInGenre = action.payload.songsInGenre
      state.songsByArtist = action.payload.songsByArtist
      state.albumsByArtist = action.payload.albumsByArtist
      state.songsInAlbum = action.payload.songsInAlbum
      state.loading = false
    },
    setStatsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { fetchStats, setStats, setStatsError } = statsSlice.actions
export default statsSlice.reducer
