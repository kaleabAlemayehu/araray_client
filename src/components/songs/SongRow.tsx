import styled from "@emotion/styled"
import { useDispatch } from "react-redux"
import { deleteSong } from "../../store/slices/songsSlice"
import { Play, Edit2, Trash2 } from "lucide-react"
import type { Song } from "../../types"

interface SongRowProps {
  song: Song
  onPlay: () => void
  onEdit: () => void
  onDelete: () => void
}

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid var(--secondary);
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: var(--secondary);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 80px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 60px;
    padding: 1rem;
  }
`

const CellText = styled.div`
  font-size: 0.875rem;
  color: var(--foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const CellSecondary = styled(CellText)`
  color: var(--muted-foreground);
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
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
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: var(--card);
    color: var(--foreground);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const PlayButton = styled(ActionButton)`
  &:hover {
    background-color: var(--primary);
    color: var(--background);
  }
`

const MobileContent = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

const MobileTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--foreground);
`

const MobileArtist = styled.div`
  font-size: 0.75rem;
  color: var(--muted-foreground);
`

export default function SongRow({ song, onPlay, onEdit, onDelete }: SongRowProps) {
  const dispatch = useDispatch()


  return (
    <RowContainer>
      <MobileContent>
        <MobileTitle>{song.title}</MobileTitle>
        <MobileArtist>{song.artist}</MobileArtist>
      </MobileContent>

      <CellText>{song.title}</CellText>
      <CellSecondary>{song.artist}</CellSecondary>
      <CellSecondary>{song.album}</CellSecondary>
      <CellSecondary>{song.genre}</CellSecondary>

      <ActionsContainer>
        <PlayButton onClick={onPlay} title="Play">
          <Play />
        </PlayButton>
        <ActionButton onClick={onEdit} title="Edit">
          <Edit2 />
        </ActionButton>
        <ActionButton onClick={onDelete} title="Delete">
          <Trash2 />
        </ActionButton>
      </ActionsContainer>
    </RowContainer>
  )
}
