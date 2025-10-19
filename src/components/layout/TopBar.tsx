"use client"

import { Box, Flex, Button, Text } from "rebass"
import styled from "@emotion/styled"
import { Menu, Search } from "lucide-react"

interface TopBarProps {
  onMenuClick: () => void
}

const SearchContainer = styled(Flex)`
  background-color: var(--secondary);
  border-radius: 24px;
  transition: all 0.15s ease-in-out;

  &:focus-within {
    background-color: var(--card);
    border: 1px solid var(--primary);
  }
`

const SearchInput = styled.input`
  background: none;
  border: none;
  color: var(--foreground);
  outline: none;
  flex: 1;
  font-size: 0.875rem;

  &::placeholder {
    color: var(--muted-foreground);
  }
`

// const UserProfile = styled(Flex)`
//   background-color: var(--secondary);
//   border-radius: 24px;
//   cursor: pointer;
//   transition: all 0.15s ease-in-out;
//
//   &:hover {
//     background-color: var(--primary);
//   }
//
//   @media (max-width: 768px) {
//     display: none;
//   }
// `

// const Avatar = styled(Box)`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: var(--primary);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   font-size: 0.875rem;
// `

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <Box
      as="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: [2, 3],
        bg: "var(--card)",
        borderBottom: `1px solid var(--secondary)`,
        gap: 3,
        flexShrink: 0,
      }}
    >
      <Flex sx={{ alignItems: "center", gap: 3, flex: 1, minWidth: 0 }}>
        <Button
          onClick={onMenuClick}
          sx={{
            display: ["flex", "flex", "none"],
            alignItems: "center",
            justifyContent: "center",
            bg: "transparent",
            border: "none",
            color: "var(--foreground)",
            cursor: "pointer",
            p: 2,
            transition: `color 0.15s ease-in-out`,
            "&:hover": {
              color: "var(--primary)",
            },
          }}
        >
          <Menu size={24} />
        </Button>

        <SearchContainer
          sx={{
            alignItems: "center",
            gap: 2,
            p: 2,
            flex: 1,
            maxWidth: ["200px", "400px"],
          }}
        >
          <Search size={18} color="#000" />
          <SearchInput placeholder="Search songs, artists..." />
        </SearchContainer>
      </Flex>
    </Box>
  )
}
