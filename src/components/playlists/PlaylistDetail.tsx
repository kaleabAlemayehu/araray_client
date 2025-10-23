"use client"

import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { removeSongFromPlaylist } from "../../store/slices/playlistsSlice"
import { setCurrentSong, setQueue, setIsPlaying } from "../../store/slices/playbackSlice"
import { Play, Trash2 } from "lucide-react"

interface PlaylistDetailProps {
  playlistId: string
}

const Container = styled.div`
  background-color: var(--card);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
`

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PlaylistTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--foreground);
`

const PlaylistMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
`

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--background);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--accent);
    transform: scale(1.05);
  }

  svg {
    width: 28px;
    height: 28px;
  }
`

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const SongsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`

const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--secondary);
  border-radius: 6px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: var(--card);
  }
`

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

const SongTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SongArtist = styled.div`
  font-size: 0.75rem;
  color: var(--muted-foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: transparent;
  color: var(--muted-foreground);
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--card);
    color: var(--foreground);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--muted-foreground);
`

export const PlaylistDetail = ({ playlistId }: PlaylistDetailProps) => {
  const dispatch = useDispatch()
  const playlist = useSelector((state: RootState) => state.playlists.items.find((p) => p.id === playlistId))

  if (!playlist) {
    return <Container>Playlist not found</Container>
  }

  const handlePlayPlaylist = () => {
    if (playlist.songs.length > 0) {
      dispatch(setCurrentSong(playlist.songs[0]))
      dispatch(setQueue(playlist.songs))
      dispatch(setIsPlaying(true))
    }
  }

  const handleRemoveSong = (songId: string) => {
    dispatch(removeSongFromPlaylist({ playlistId, songId }))
  }

  return (
    <Container>
      <Header>
        <PlaylistInfo>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <PlaylistMeta>
            <span>{playlist.songs.length} songs</span>
            <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
          </PlaylistMeta>
        </PlaylistInfo>
        {playlist.songs.length > 0 && (
          <PlayButton onClick={handlePlayPlaylist} title="Play playlist">
            <Play />
          </PlayButton>
        )}
      </Header>

      <SongsContainer>
        <SongsTitle>Songs</SongsTitle>
        {playlist.songs.length === 0 ? (
          <EmptyState>No songs in this playlist. Add songs from your library!</EmptyState>
        ) : (
          playlist.songs.map((song) => (
            <SongItem key={song.id}>
              <SongInfo>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
              </SongInfo>
              <ActionButton onClick={() => handleRemoveSong(song?.id as string)} title="Remove from playlist">
                <Trash2 />
              </ActionButton>
            </SongItem>
          ))
        )}
      </SongsContainer>
    </Container>
  )
}
