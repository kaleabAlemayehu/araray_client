"use client"

import type React from "react"
import { Box, Flex, Button, Text } from "rebass"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { setIsPlaying, nextTrack, previousTrack, toggleShuffle, setRepeat } from "../../store/slices/playbackSlice"
import type { RootState } from "../../store/store"
import { Play, Pause, SkipBack, SkipForward, Shuffle as Shuffle2, Repeat2 } from "lucide-react"

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: var(--secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: var(--card);
  }
`

const ControlButton = styled(Button) <{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "var(--primary)" : "transparent")};
  color: ${(props) => (props.isActive ? "var(--background)" : "var(--foreground)")};
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${(props) => (props.isActive ? "var(--accent)" : "var(--secondary)")};
    color: var(--foreground);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const PlayButton = styled(ControlButton)`
  width: 48px;
  height: 48px;
  background-color: var(--primary);
  color: var(--background);

  &:hover {
    background-color: var(--accent);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export default function PlayerBar() {
  const dispatch = useDispatch()
  const { currentSong, isPlaying, shuffle, repeat } = useSelector((state: RootState) => state.playback)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying))
  }

  const handleNext = () => {
    dispatch(nextTrack())
  }

  const handlePrevious = () => {
    dispatch(previousTrack())
  }

  const handleShuffle = () => {
    dispatch(toggleShuffle())
  }

  const handleRepeat = () => {
    const nextRepeat = repeat === "off" ? "one" : repeat === "one" ? "all" : "off"
    dispatch(setRepeat(nextRepeat))
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = percent * duration
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })
      audioRef.current.addEventListener("ended", () => {
        if (repeat === "one") {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          }
        } else {
          dispatch(nextTrack())
        }
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [dispatch, repeat])

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

  return (
    <Box
      as="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 250,
        right: 0,
        bg: "var(--secondary)",
        borderTop: `1px solid var(--card)`,
        p: [2, 3],
        display: "flex",
        alignItems: "center",
        gap: [2, 4],
        zIndex: 100,
      }}
    >
      <Flex sx={{ alignItems: "center", gap: 3, minWidth: ["120px", "200px"], flex: "0 0 auto" }}>
        <Box
          sx={{
            width: ["40px", "56px"],
            height: ["40px", "56px"],
            bg: "var(--card)",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted-foreground)",
            fontSize: 1,
            flexShrink: 0,
          }}
        >
          ♪
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
          <Text
            sx={{
              fontSize: 1,
              fontWeight: "bold",
              color: "var(--foreground)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentSong?.title || "No song playing"}
          </Text>
          <Text
            sx={{
              fontSize: 0,
              color: "var(--muted-foreground)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {currentSong?.artist || "Select a song"}
          </Text>
        </Box>
      </Flex>

      <Flex sx={{ flex: 1, alignItems: "center", gap: 3, minWidth: "200px", display: ["none", "flex"] }}>
        <Text sx={{ fontSize: 0, color: "var(--muted-foreground)", minWidth: "40px" }}>{formatTime(currentTime)}</Text>
        <ProgressBar onClick={handleProgressClick} />
        <Text sx={{ fontSize: 0, color: "var(--muted-foreground)", minWidth: "40px" }}>{formatTime(duration)}</Text>
      </Flex>

      <Flex sx={{ alignItems: "center", gap: 2, flex: "0 0 auto" }}>
        <ControlButton onClick={handleShuffle} isActive={shuffle}>
          <Shuffle2 />
        </ControlButton>
        <ControlButton onClick={handlePrevious}>
          <SkipBack />
        </ControlButton>
        <PlayButton onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</PlayButton>
        <ControlButton onClick={handleNext}>
          <SkipForward />
        </ControlButton>
        <ControlButton onClick={handleRepeat} isActive={repeat !== "off"}>
          <Repeat2 />
        </ControlButton>
      </Flex>
    </Box>
  )
}
