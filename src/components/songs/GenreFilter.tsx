
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import { setGenre } from "../../store/slices/songsSlice"
import type { RootState } from "../../store/store"

const genres = ["All", "Rock", "Pop", "Hip Hop", "Jazz", "Classical"]

const GenreFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const GenreButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  color: var(--foreground);
  border: 1px solid var(--card);
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--accent);
    color: var(--foreground);
    border: 1px solid var(--primary);
  }

  &.active {
    background-color: var(--primary);
    color: var(--background);
  }
`

export default function GenreFilter() {
  const dispatch = useDispatch()
  const { genre: selectedGenre } = useSelector((state: RootState) => state.songs)

  const handleGenreClick = (genre: string) => {
    dispatch(setGenre(genre === "All" ? "" : genre))
  }

  return (
    <GenreFilterContainer>
      {genres.map((genre) => (
        <GenreButton
          key={genre}
          onClick={() => handleGenreClick(genre)}
          className={genre === (selectedGenre || "All") ? "active" : ""}
        >
          {genre}
        </GenreButton>
      ))}
    </GenreFilterContainer>
  )
}
