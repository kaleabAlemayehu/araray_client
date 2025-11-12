import { useState } from "react"
import styled from "@emotion/styled"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { PlaylistList } from "../components/playlists/PlaylistList"
import { PlaylistDetail } from "../components/playlists/PlaylistDetail"

const PlaylistsContainer = styled.div`
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--foreground);
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const EmptyDetailState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card);
  border-radius: 8px;
  padding: 1.5rem;
  color: var(--muted-foreground);
  font-size: 1rem;
  min-height: 200px; /* Ensure it takes up some space */
`

export default function Playlists() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
  // const playlists = useSelector((state: RootState) => state.playlists.items)
  function handlePlaylistSelect(id: string) {
    console.log("playlistId", id)
    setSelectedPlaylistId(id)
  }

  return (
    <PlaylistsContainer>
      <Title>Playlists</Title>
      <ContentWrapper>
        <PlaylistList selectedId={selectedPlaylistId} onSelect={handlePlaylistSelect} />
        {selectedPlaylistId ? (
          <PlaylistDetail playlistId={selectedPlaylistId} />
        ) : (
          <EmptyDetailState>Select a playlist to view its details.</EmptyDetailState>
        )}
      </ContentWrapper>
    </PlaylistsContainer>
  )
}
