export interface Song {
  _id?: string
  id?: string
  title: string
  artist: string
  album: string
  genre: string
  audioUrl: string
  duration?: number
}

export interface Playlist {
  _id?: string
  id?: string
  name: string
  description?: string
  songs: Song[]
  createdAt: number
}

export interface PlaybackState {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  currentPlaylistId: string | null
  currentIndex: number
  shuffle: boolean
  repeat: "off" | "one" | "all"
  currentTime: number
}

export interface StatsState {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsByGenre: Record<string, number>
  songsByArtist: Record<string, number>
  albumsByArtist: Record<string, number>
}
