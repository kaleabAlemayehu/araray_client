"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nextTrack } from "../store/slices/playbackSlice"
import type { RootState } from "../store/store"

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const dispatch = useDispatch()
  const { currentSong, isPlaying, queue, currentIndex, repeat } = useSelector((state: RootState) => state.playback)

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener("ended", handleSongEnd)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd)
      }
    }
  }, [])

  // Handle song end
  const handleSongEnd = () => {
    if (repeat === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      dispatch(nextTrack())
    }
  }

  // Update audio source and play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [currentSong, isPlaying])

  return audioRef
}
