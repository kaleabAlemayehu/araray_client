import type React from "react"

import { useState } from "react"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { createPlaylist, deletePlaylist } from "../../store/slices/playlistsSlice"
import { Plus, Trash2 } from "lucide-react"

interface PlaylistListProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--card);
  border-radius: 8px;
  padding: 1rem;
  height: fit-content;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: var(--foreground);
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: var(--primary);
  color: var(--background);
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: var(--accent);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const PlaylistItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
`

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  opacity: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const PlaylistItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.isSelected ? "var(--primary)" : "var(--secondary)")};
  color: ${(props) => (props.isSelected ? "var(--background)" : "var(--foreground)")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "var(--accent)" : "var(--card)")};
    .delete-button {
      opacity: 1;
    }
  }
`

const PlaylistName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

const EmptyState = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--muted-foreground);
  font-size: 0.75rem;
`

export const PlaylistList = ({ selectedId, onSelect }: PlaylistListProps) => {
  const dispatch = useDispatch()
  const playlists = useSelector((state: RootState) => state.playlists.items)

  const handleAddPlaylist = () => {
    const name = prompt("Enter playlist name:")
    if (name && name.trim()) {
      dispatch(
        createPlaylist({
          id: Date.now().toString(),
          name: name.trim(),
          songs: [],
          createdAt: Date.now(),
        }),
      )
    }
  }

  const handleDeletePlaylist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("Delete this playlist?")) {
      dispatch(deletePlaylist(id))
      if (selectedId === id) {
        onSelect("")
      }
    }
  }

  return (
    <Container>
      <Header>
        <Title>My Playlists</Title>
        <AddButton onClick={handleAddPlaylist} title="Create playlist">
          <Plus />
        </AddButton>
      </Header>

      {playlists.length === 0 ? (
        <EmptyState>No playlists yet. Create one to get started!</EmptyState>
      ) : (
        <PlaylistItemContainer>
          {playlists.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              isSelected={selectedId === playlist.id}
              onClick={() => onSelect(playlist.id)}
            >
              <PlaylistName>{playlist.name}</PlaylistName>
              <DeleteButton
                className="delete-button"
                onClick={(e) => handleDeletePlaylist(e, playlist.id)}
              >
                <Trash2 />
              </DeleteButton>
            </PlaylistItem>
          ))}
        </PlaylistItemContainer>
      )}
    </Container>
  )
}
