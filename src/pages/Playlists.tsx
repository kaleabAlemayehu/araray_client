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

export default function Playlists() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
  const playlists = useSelector((state: RootState) => state.playlists.items)

  return (
    <PlaylistsContainer>
      <Title>Playlists</Title>
      <ContentWrapper>
        <PlaylistList selectedId={selectedPlaylistId} onSelect={setSelectedPlaylistId} />
        {selectedPlaylistId && <PlaylistDetail playlistId={selectedPlaylistId} />}
      </ContentWrapper>
    </PlaylistsContainer>
  )
}
