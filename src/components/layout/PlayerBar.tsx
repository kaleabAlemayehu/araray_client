import type React from "react"
import { Box, Flex, Button, Text } from "rebass"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react"
import { setIsPlaying, nextTrack, previousTrack, toggleShuffle, setRepeat, setCurrentTime } from "../../store/slices/playbackSlice"
import type { RootState } from "../../store/store"
import { Play, Pause, SkipBack, SkipForward, Shuffle as ShuffleIcon, Repeat as RepeatIcon, Repeat1 as Repeat1Icon } from "lucide-react"

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: var(--secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  position: relative;
  &:hover {
    background-color: var(--accent);
  }
`

const Progress = styled.div`
  height: 100%;
  background-color: var(--primary);
  border-radius: 2px;
  transition: width 0.1s linear;
`

const ProgressCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary);
  transform: translate(-50%, -50%);
  transition: left 0.1s linear;
  opacity: 0;
`

const ProgressBarContainer = styled.div`
  flex: 1;
  position: relative;
  &:hover ${ProgressCircle.toString()} {
    opacity: 1;
  }
`

const ControlButton = styled(Button) <{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: ${(props) => (props.isActive ? "var(--background)" : "var(--foreground)")};
  background-color: ${(props) => (props.isActive ? "var(--foreground)" : "transparent")};
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  border: transparent solid 0.1px;
  &:hover {
    background-color: var(--secondary);
    border: var(--foreground) solid 0.1px;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  &:active {
    background-color: var(--foreground);
    color: var(--background);
  } 
`



const PlayButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--background);
  border: transparent solid 0.1px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: var(--accent);
    color: var(--foreground);
    border: var(--foreground) solid 0.1px;
  }
  svg {
    width: 40px;
    height: 40px;
  }
`



export default function PlayerBar() {
  const dispatch = useDispatch()

  const { currentSong, isPlaying, shuffle, repeat, currentTime } = useSelector((state: RootState) => state.playback)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
    audioRef.current.currentTime = percent * (audioRef.current.duration || 0)
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const renderRepeatIcon = () => {
    switch (repeat) {
      case "one":
        return <Repeat1Icon size={20} />
      case "all":
        return <RepeatIcon size={20} />
      default:
        return <RepeatIcon size={20} />
    }
  }
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener("timeupdate", () => {
        dispatch(setCurrentTime(audioRef.current?.currentTime || 0))
      })
      audioRef.current.addEventListener("ended", () => {
        dispatch(nextTrack())
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (!audioRef.current) return
    if (currentSong) {
      if (audioRef.current.src !== currentSong.audioUrl) {
        audioRef.current.src = currentSong.audioUrl
        audioRef.current.currentTime = currentTime
      }

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [currentSong, isPlaying, currentTime])

  const progressPercent = audioRef.current?.duration ? (currentTime / audioRef.current.duration) * 100 : 0


  return (
    <Box as="footer"
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
        <Box sx={{
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
        }}>
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
            }}>
            {currentSong?.title || "No song playing"}
          </Text>
          <Text
            sx={{
              fontSize: 0,
              color: "var(--muted-foreground)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {currentSong?.artist || "Select a song"}
          </Text>
        </Box>
      </Flex>

      <Flex sx={{ flex: 1, alignItems: "center", gap: 3, minWidth: "200px", display: ["none", "flex"] }}>
        <Text sx={{ fontSize: 0, color: "var(--muted-foreground)", minWidth: "40px" }}>{formatTime(currentTime)}</Text>
        <ProgressBarContainer>
          <ProgressBar onClick={handleProgressClick}>
            <Progress style={{ width: `${progressPercent}%` }} />
            <ProgressCircle style={{ left: `${progressPercent}%` }} />
          </ProgressBar>
        </ProgressBarContainer>
        <Text sx={{ fontSize: 0, color: "var(--muted-foreground)", minWidth: "40px" }}>{formatTime(audioRef.current?.duration || 0)}</Text>
      </Flex>

      <Flex sx={{ alignItems: "center", gap: 2, flex: "0 0 auto" }}>
        <ControlButton onClick={handleShuffle} isActive={shuffle}>
          <ShuffleIcon size={20} />
        </ControlButton>
        <ControlButton onClick={handlePrevious}>
          <SkipBack size={20} />
        </ControlButton>
        <PlayButton onClick={handlePlayPause}>{isPlaying ? <Pause /> : <Play />}</PlayButton>
        <ControlButton onClick={handleNext}>
          <SkipForward size={20} />
        </ControlButton>
        <ControlButton onClick={handleRepeat} isActive={repeat !== "off"}>
          {renderRepeatIcon()}
        </ControlButton>
      </Flex>
    </Box>)
}
