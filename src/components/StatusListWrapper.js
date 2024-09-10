import React, { useState } from 'react'
import StatusList from './StatusList'

const StatusListWrapper = ({ deviceId }) => {
  const [showStatusList, setShowStatusList] = useState(false)

  const handleDeviceClick = () => {
    setShowStatusList(prevState => !prevState)
  }

  return (
    <div>
      <button onClick={handleDeviceClick}>
        {showStatusList ? 'Ocultar StatusList' : 'Mostrar StatusList'}
      </button>
      {showStatusList && <StatusList deviceId={deviceId} />}
    </div>
  )
}

export default StatusListWrapper