
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Song } from "../../types"
import { fetchSongs } from "../../store/slices/songsSlice"
import type { RootState } from "../../store/store"
import { createPlaylist } from "../../store/slices/playlistsSlice"

interface AddPlaylistModalProps {
  onClose: () => void
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
  margin-inline: auto;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background-color: var(--input);
  color: var(--foreground);
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background-color: var(--input);
  color: var(--foreground);
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`

const SongSelectContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem;
`

const SongSelectItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: var(--secondary);
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
      background-color: #fff;
      color: var(--foreground);
      border: 1px solid var(--foreground);
    }
  `
      : `
    background-color: var(--primary);
    color: var(--background);

    &:hover {
      background-color: #fff;
      color: var(--foreground);
      border: 1px solid var(--foreground);
    }
  `}
`

export default function AddPlaylistModal({ onClose }: AddPlaylistModalProps) {
  const dispatch = useDispatch()
  const { items: songs, loading } = useSelector((state: RootState) => state.songs)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedSongs, setSelectedSongs] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])

  const handleSongSelection = (songId: string) => {
    setSelectedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert("Playlist name is required.")
      return
    }

    const newPlaylist = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      songs: songs.filter((song) => selectedSongs.includes(song.id!)),
      createdAt: Date.now(),
    }

    dispatch(createPlaylist(newPlaylist))
    onClose()
  }

  return (
    <Overlay onClick={onClose}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <Title>Create New Playlist</Title>

          <FormGroup>
            <Label htmlFor="playlist-name">Playlist Name</Label>
            <Input
              id="playlist-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="playlist-description">Description</Label>
            <TextArea
              id="playlist-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of your playlist..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Select Songs</Label>
            {loading ? (
              <p>Loading songs...</p>
            ) : (
              <SongSelectContainer>
                {songs.map((song: Song) => (
                  <SongSelectItem
                    key={song.id}
                    onClick={() => handleSongSelection(song.id!)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.id!)}
                      readOnly
                    />
                    <span>
                      {song.title} - {song.artist}
                    </span>
                  </SongSelectItem>
                ))}
              </SongSelectContainer>
            )}
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">Create Playlist</Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Overlay>
  )
}
