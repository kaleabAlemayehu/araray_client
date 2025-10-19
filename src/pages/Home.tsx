"use client"

import styled from "@emotion/styled"
import SongList from "../components/songs/SongList"

const HomeContainer = styled.div`
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--foreground);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export default function Home() {
  return (
    <HomeContainer>
      <Title>Your Library</Title>
      <SongList />
    </HomeContainer>
  )
}