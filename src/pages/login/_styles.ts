import type { CSSProperties } from 'react'

export const layoutStyles: CSSProperties = {}

export const titleStyles: CSSProperties = {
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: '24px',
  overflowWrap: 'break-word',
  hyphens: 'manual',
  textOverflow: 'unset',
  whiteSpace: 'pre-wrap',
}

export const pageTitleStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '32px',
  fontSize: '20px',
}

export const formContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100dvh',
  padding: '16px',
  width: '100%',
  maxWidth: '400px',
}

export const boxContainerStyles: CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 0,
}
