"use client"

import styled from "@emotion/styled"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
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
  const songs = useSelector((state: RootState) => state.songs.items)

  // Calculate statistics
  const totalSongs = songs.length
  const uniqueArtists = new Set(songs.map((s) => s.artist)).size
  const uniqueAlbums = new Set(songs.map((s) => s.album)).size
  const uniqueGenres = new Set(songs.map((s) => s.genre)).size

  const songsByGenre: Record<string, number> = {}
  const songsByArtist: Record<string, number> = {}
  const albumsByArtist: Record<string, Set<string>> = {}

  songs.forEach((song) => {
    // Count by genre
    songsByGenre[song.genre] = (songsByGenre[song.genre] || 0) + 1

    // Count by artist
    songsByArtist[song.artist] = (songsByArtist[song.artist] || 0) + 1

    // Count albums by artist
    if (!albumsByArtist[song.artist]) {
      albumsByArtist[song.artist] = new Set()
    }
    albumsByArtist[song.artist].add(song.album)
  })

  const albumsByArtistCount = Object.entries(albumsByArtist).reduce(
    (acc, [artist, albums]) => {
      acc[artist] = albums.size
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <StatsContainer>
      <Title>Your Statistics</Title>

      <StatsGrid>
        <StatCard label="Total Songs" value={totalSongs} />
        <StatCard label="Artists" value={uniqueArtists} />
        <StatCard label="Albums" value={uniqueAlbums} />
        <StatCard label="Genres" value={uniqueGenres} />
      </StatsGrid>

      <ChartsGrid>
        <GenreChart data={songsByGenre} />
        <ArtistChart data={songsByArtist} />
      </ChartsGrid>
    </StatsContainer>
  )
}