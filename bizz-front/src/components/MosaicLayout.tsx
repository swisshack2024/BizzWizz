import React, { useState } from 'react'
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { LeafComponent } from './LeafComponent.tsx'

const initialNode: MosaicNode<string> = {
  direction: 'row',
  first: 'ChatBoxWindow',
  second: 'GraphPanelWindow',
  splitPercentage: 50,
}

const MosaicLayout: React.FC = () => {
  const [mosaicNode, setMosaicNode] = useState<MosaicNode<string>>(initialNode)

  const onChange = (newNode: MosaicNode<string> | null) => {
    if (newNode !== null) {
      setMosaicNode(newNode)
    }
  }

  return (
  <div style={{ flex: 1, width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Mosaic
        renderTile={(id, path) => (
          <MosaicWindow title={id} path={path}>
            <div
              style={{
                height: '100%',
                border: '2px solid #ccc',
                position: 'relative',
              }}
            >
              <div style={{ flex: 1, overflow: 'auto' }}>
                <LeafComponent title={id} />
              </div>
            </div>
          </MosaicWindow>
        )}
        value={mosaicNode}
        onChange={onChange}
        initialValue={initialNode}
        resize={{
          minimumPaneSizePercentage: 0,
        }}
      />
    </div>
  )
}

export default MosaicLayout
