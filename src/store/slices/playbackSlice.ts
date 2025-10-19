import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PlaybackState, Song } from "../../types"

const initialState: PlaybackState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentPlaylistId: null,
  currentIndex: -1,
  shuffle: false,
  repeat: "off",
  currentTime: 0,
}

const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song | null>) => {
      state.currentSong = action.payload
      state.currentTime = 0
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
    setCurrentPlaylistId: (state, action: PayloadAction<string | null>) => {
      state.currentPlaylistId = action.payload
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle
    },
    setRepeat: (state, action: PayloadAction<"off" | "one" | "all">) => {
      state.repeat = action.payload
    },
    nextTrack: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1
        state.currentSong = state.queue[state.currentIndex]
        state.currentTime = 0
      }
    },
    previousTrack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1
        state.currentSong = state.queue[state.currentIndex]
        state.currentTime = 0
      }
    },
  },
})

export const {
  setCurrentSong,
  setIsPlaying,
  setCurrentTime,
  setQueue,
  setCurrentIndex,
  setCurrentPlaylistId,
  toggleShuffle,
  setRepeat,
  nextTrack,
  previousTrack,
} = playbackSlice.actions
export default playbackSlice.reducer