import React, { useEffect, useState } from 'react'
import StatusListWrapper from './StatusListWrapper'

const DevicesList = ({ locationId }) => {
  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/locations/${locationId}/devices`)
        const data = await response.json()
        
        if (Array.isArray(data)) {
          setDevices(data)
        } else {
          console.error('Expected an array but got:', data)
          setDevices([])
        }
      } catch (error) {
        console.error('Error fetching devices:', error)
        setDevices([])
      }
    }

    fetchDevices()
  }, [locationId])

  return (
    <div>
      <h2>Lista de Dispositivos</h2>
      <ul>
        {devices.map(device => (
          <li key={`device_${device.id}`} onClick={() => setSelectedDeviceId(device.id)}>
            {device.name} - Estado actual: {device.current_status}
          </li>
        ))}
      </ul>
      {selectedDeviceId && <StatusListWrapper deviceId={selectedDeviceId} />}
    </div>
  )
}

export default DevicesList