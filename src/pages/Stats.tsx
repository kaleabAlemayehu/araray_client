"use client"

import { useEffect } from "react"
import styled from "@emotion/styled"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import { fetchStats } from "../store/slices/statsSlice"
import StatCard from "../components/stats/StatCard"
import GenreChart from "../components/stats/GenreChart"
import ArtistChart from "../components/stats/ArtistChart"

const StatsContainer = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export default function Stats() {
  const dispatch = useDispatch()
  const { totalSongs, totalArtists, totalAlbums, totalGenres, songsInGenre, songsByArtist } = useSelector(
    (state: RootState) => state.stats,
  )

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  const songsInGenreData = songsInGenre.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
  }, {} as Record<string, number>)

  const songsByArtistData = songsByArtist.reduce((acc, item) => {
    acc[item._id] = item.count
    return acc
  }, {} as Record<string, number>)

  return (
    <StatsContainer>
      <Title>Your Statistics</Title>

      <StatsGrid>
        <StatCard label="Total Songs" value={totalSongs} />
        <StatCard label="Artists" value={totalArtists} />
        <StatCard label="Albums" value={totalAlbums} />
        <StatCard label="Genres" value={totalGenres} />
      </StatsGrid>

      <ChartsGrid>
        <GenreChart data={songsInGenreData} />
        <ArtistChart data={songsByArtistData} />
      </ChartsGrid>
    </StatsContainer>
  )
}
