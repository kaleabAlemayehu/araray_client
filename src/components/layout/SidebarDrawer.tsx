"use client"
import { Box, Flex, Button, Text } from "rebass"
import styled from "@emotion/styled"
import { Home, Music, BarChart3, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarDrawerProps {
  isOpen: boolean
  onToggle: () => void
  onNavigate?: (page: string) => void
}

const SidebarContainer = styled(Box) <{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "250px" : "80px")};
  background-color: var(--card);
  border-right: 1px solid var(--secondary);
  transition: width 0.3s ease-in-out;
  overflow: hidden;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    width: ${(props) => (props.isOpen ? "250px" : "0")};
  }
`

const NavItem = styled(Flex) <{ isActive?: boolean }>`
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  color: ${(props) => (props.isActive ? "var(--primary)" : "var(--muted-foreground)")};
  background-color: ${(props) => (props.isActive ? "var(--secondary)" : "transparent")};

  &:hover {
    background-color: var(--secondary);
    color: var(--foreground);
  }
`

const AddButton = styled(Button)`
  background-color: var(--primary);
  color: var(--background);
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: var(--accent);
  }
`

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`

export default function SidebarDrawer({ isOpen, onToggle, onNavigate }: SidebarDrawerProps) {
  const navItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Music, label: "Playlists", id: "playlists" },
    { icon: BarChart3, label: "Stats", id: "stats" },
  ]

  return (
    <>
      <SidebarContainer
        isOpen={isOpen}
        as="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Flex sx={{ alignItems: "center", justifyContent: "space-between", mb: 4, gap: 2 }}>
          <Flex sx={{ alignItems: "center", gap: 2 }}>
            <Music size={28} color="var(--primary)" />
            {isOpen && (
              <Text sx={{ fontSize: 5, fontWeight: "bold", color: "var(--primary)", whiteSpace: "nowrap" }}>
                Araray
              </Text>
            )}
          </Flex>
          <Button
            onClick={onToggle}
            sx={{
              display: ["block", "block", "none"],
              // bg: "transparent",
              border: "solid 1px var(--secondary)",
              color: "var(--foreground)",
              cursor: "pointer",
              p: 2,
            }}
          >
            <X size={42} />
          </Button>
        </Flex>

        <Box as="ul" sx={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              as="li"
              onClick={() => onNavigate?.(item.id)}
              sx={{
                alignItems: "center",
                gap: 3,
                p: 2,
              }}
            >
              <item.icon size={24} />
              {isOpen && <Text sx={{ whiteSpace: "nowrap", fontSize: 2, fontWeight: 500 }}>{item.label}</Text>}
            </NavItem>
          ))}
        </Box>

        <AddButton sx={{ display: "flex", width: "min-content", alignItems: "center", gap: 3, mt: "auto" }} onClick={onToggle}>
          {isOpen ? <ChevronLeft size={20} color="var(--background" /> : <ChevronRight size={20} color="var(--background)" />}
        </AddButton>
      </SidebarContainer>
      {isOpen && <Overlay onClick={onToggle} />}
    </>
  )
}
