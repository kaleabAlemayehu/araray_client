"use client"

import styled from "@emotion/styled"

interface GenreChartProps {
  data: Record<string, number>
}

const ChartContainer = styled.div`
  background-color: var(--card);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--secondary);
`

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: 1.5rem;
`

const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Label = styled.div`
  min-width: 100px;
  font-size: 0.875rem;
  color: var(--foreground);
  font-weight: 500;
`

const BarContainer = styled.div`
  flex: 1;
  height: 24px;
  background-color: var(--secondary);
  border-radius: 4px;
  overflow: hidden;
`

const Bar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: width 0.3s ease;
`

const Count = styled.div`
  min-width: 40px;
  text-align: right;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  font-weight: 600;
`

const EmptyState = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: var(--muted-foreground);
`

export default function GenreChart({ data }: GenreChartProps) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1])
  const maxValue = Math.max(...entries.map((e) => e[1]), 1)

  if (entries.length === 0) {
    return (
      <ChartContainer>
        <Title>Songs by Genre</Title>
        <EmptyState>No data available</EmptyState>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer>
      <Title>Songs by Genre</Title>
      <ChartContent>
        {entries.map(([genre, count]) => (
          <BarItem key={genre}>
            <Label>{genre}</Label>
            <BarContainer>
              <Bar percentage={(count / maxValue) * 100} />
            </BarContainer>
            <Count>{count}</Count>
          </BarItem>
        ))}
      </ChartContent>
    </ChartContainer>
  )
}