import type React from "react"
import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useDispatch } from "react-redux"
import { addSong, updateSong } from "../../store/slices/songsSlice"
import { X } from "lucide-react"
import type { Song } from "../../types"

interface SongFormProps {
  onClose: () => void
  initialSong?: Song
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-overlay);
  padding: 1rem;
`

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 9999;
`

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: var(--secondary);
  color: var(--foreground);
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: red;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--foreground);
`

const Input = styled.input`
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  border: 1px solid var(--secondary);
  border-radius: 6px;
  color: var(--foreground);
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &::placeholder {
    color: var(--muted-foreground);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  ${(props) =>
    props.variant === "secondary"
      ? `
    background-color: var(--secondary);
    color: var(--foreground);
    border: 1px solid var(--secondary);

    &:hover {
      background-color: var(--card);
    }
  `
      : `
    background-color: var(--primary);
    color: var(--background);

    &:hover {
      background-color: var(--accent);
    }
  `}
`

const ErrorMessage = styled.p`
  color: var(--destructive);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

export default function SongForm({ onClose, initialSong }: SongFormProps) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    audioUrl: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialSong) {
      setFormData({
        title: initialSong.title,
        artist: initialSong.artist,
        album: initialSong.album,
        genre: initialSong.genre,
        audioUrl: initialSong.audioUrl,
      })
    }
  }, [initialSong])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.artist) {
      setError("Please fill in title and artist")
      return
    }

    if (initialSong) {
      dispatch(
        updateSong({
          ...initialSong,
          ...formData,
        }),
      )
    } else {
      dispatch(
        addSong({
          id: Date.now().toString(),
          ...formData,
        }),
      )
    }

    onClose()
  }

  return (
    <Overlay onClick={onClose}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <FormHeader>
          <FormTitle>{initialSong ? "Edit Song" : "Add New Song"}</FormTitle>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Song Title <span style={{ color: "red" }}>*</span></Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter song title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="artist">Artist <span style={{ color: "red" }}>*</span></Label>
            <Input
              id="artist"
              name="artist"
              type="text"
              placeholder="Enter artist name"
              value={formData.artist}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="album">Album <span style={{ color: "red" }}>*</span></Label>
            <Input
              id="album"
              name="album"
              type="text"
              placeholder="Enter album name"
              value={formData.album}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="genre">Genre <span style={{ color: "red" }}>*</span></Label>
            <Input
              id="genre"
              name="genre"
              type="text"
              placeholder="Enter genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="audioUrl">Audio URL <span style={{ color: "red" }}>*</span></Label>
            <Input
              id="audioUrl"
              name="audioUrl"
              type="url"
              placeholder="https://example.com/audio.mp3"
              value={formData.audioUrl}
              onChange={handleChange}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialSong ? "Update" : "Add"} Song</Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Overlay>
  )
}
