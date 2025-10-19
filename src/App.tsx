"use client"

import { useState } from "react"
import styled from "@emotion/styled"
import SidebarDrawer from "./components/layout/SidebarDrawer"
import TopBar from "./components/layout/TopBar"
import PlayerBar from "./components/layout/PlayerBar"
import Home from "./pages/Home"
import Playlists from "./pages/Playlists"
import Stats from "./pages/Stats"

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--background);
  overflow: hidden;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 100px;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    padding-bottom: 120px;
  }
`

type PageType = "home" | "playlists" | "stats"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageType>("home")

  const renderPage = () => {
    switch (currentPage) {
      case "playlists":
        return <Playlists />
      case "stats":
        return <Stats />
      default:
        return <Home />
    }
  }

  return (
    <AppContainer>
      <SidebarDrawer
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={(page) => {
          setCurrentPage(page as PageType)
          setSidebarOpen(false)
        }}
      />
      <MainContent>
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <ContentArea>{renderPage()}</ContentArea>
        <PlayerBar />
      </MainContent>
    </AppContainer>
  )
}