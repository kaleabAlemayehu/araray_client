import styled from "@emotion/styled"
import { Text } from "rebass"

interface DeleteModalProps {
  onClose: () => void
  songTitle: string
}


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-overlay);
  padding: 1rem;
`

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  margin-inline: auto;
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  ${(props) =>
    props.variant === "secondary"
      ? `
    background-color: var(--secondary);
    color: var(--foreground);
    border: 1px solid var(--secondary);

    &:hover {
      background-color: #0f0;
    }
  `
      : `
    background-color: var(--primary);
    color: var(--background);

    &:hover {
      background-color: #f00;
    }
  `}
`
export default function DeleteModal({ onClose, songTitle }: DeleteModalProps) {
  return (
    <>
      <Overlay onClick={onClose}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <Text color='black'> Are you sure you want to delete {songTitle}?</Text>
          <ButtonGroup>
            <Button type="submit" color="#f00">Delete</Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </FormContainer >
      </Overlay >
    </>
  )
}
