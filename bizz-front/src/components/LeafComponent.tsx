import React from 'react'
import ChatBox from './ChatBox.tsx'

const ChatBoxWindow: React.FC = () => {
  return (
    <div>
      <ChatBox />
    </div>
  )
}

const PdfViewerWindow: React.FC = () => {
  return <div>PDF Viewer Component</div>
}

const GraphPanelWindow: React.FC = () => {
  return <div>A nice looking</div>
}

export const LeafComponent: React.FC<{ title: string }> = ({ title }) => {
  switch (title) {
    case 'ChatBoxWindow':
      return <ChatBoxWindow />
    case 'PdfViewerWindow':
      return <PdfViewerWindow />
    case 'GraphPanelWindow':
      return <GraphPanelWindow />
    default:
      return null // Handle other cases or return null if no match
  }
}
