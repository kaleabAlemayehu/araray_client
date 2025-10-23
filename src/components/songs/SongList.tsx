import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store/store"
import { setCurrentSong, setQueue, setIsPlaying } from "../../store/slices/playbackSlice"
import { fetchSongs } from "../../store/slices/songsSlice"
import SongForm from "./SongForm"
import SongRow from "./SongRow"
import GenreFilter from "./GenreFilter"
import { Plus } from "lucide-react"
import type { Song } from "../../types"
import DeleteModal from "./DeleteModal"

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: var(--background);
  border: 1px solid transparent;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--accent);
    color: var(--foreground);
    border: 1px solid var(--primary);
    transform: scale(1.02);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const SongsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--card);
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--secondary);
  border-bottom: 1px solid var(--card);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-foreground);
  text-transform: uppercase;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 80px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--muted-foreground);
`

export default function SongList() {
  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [deletingSong, setDeletingSong] = useState<Song | null>(null)
  const dispatch = useDispatch()
  const { items: songs, searchQuery, genre } = useSelector((state: RootState) => state.songs)

  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])

  const filteredSongs = songs
    .filter((song) => (genre ? song.genre === genre : true))
    .filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handlePlaySong = (song: Song) => {
    dispatch(setCurrentSong(song))
    dispatch(setQueue(songs))
    dispatch(setIsPlaying(true))
  }

  const handleEdit = (song: Song) => {
    setEditingSong(song)
    setShowForm(true)
  }

  const handleDelete = (song: Song) => {
    setDeletingSong(song)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingSong(null)
  }

  const handleCloseDeleteModal = () => {
    setDeletingSong(null)
  }

  return (
    <SongListContainer>
      <Header>
        <Title>All Songs</Title>
        <AddButton onClick={() => setShowForm(true)}>
          <Plus />
          Add Song
        </AddButton>
      </Header>

      {showForm && <SongForm onClose={handleCloseForm} initialSong={editingSong as Song} />}
      {deletingSong && (
        <DeleteModal
          onClose={handleCloseDeleteModal}
          songTitle={deletingSong.title}
          songID={deletingSong?.id as string}
        />
      )}

      <GenreFilter />

      {filteredSongs.length === 0 ? (
        <EmptyState>No songs yet. Add your first song to get started!</EmptyState>
      ) : (
        <SongsTable>
          <TableHeader>
            <div>Title</div>
            <div>Artist</div>
            <div>Album</div>
            <div>Genre</div>
            <div>Actions</div>
          </TableHeader>
          {filteredSongs.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              onPlay={() => handlePlaySong(song)}
              onEdit={() => handleEdit(song)}
              onDelete={() => handleDelete(song)}
            />
          ))}
        </SongsTable>
      )}
    </SongListContainer>
  )
}
