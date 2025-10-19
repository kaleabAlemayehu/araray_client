"use client"

import styled from "@emotion/styled"

interface StatCardProps {
  label: string
  value: number
}

const Card = styled.div`
  background-color: var(--card);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--secondary);
  transition: all 0.15s ease-in-out;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`

const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
`

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  )
}