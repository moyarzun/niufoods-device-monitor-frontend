import React, { useEffect, useState } from 'react'
import StatusList from './StatusList'

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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista de Dispositivos</h2>
      <ul className="space-y-4">
        {devices.map(device => (
          <li
            key={`device_${device.id}`}
            className="cursor-pointer p-4 rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-blue-100"
          >
            <div className="flex justify-between items-center">
              <span>{device.name} - Estado actual: {device.current_status}</span>
              <button
                onClick={() => setSelectedDeviceId(selectedDeviceId === device.id ? null : device.id)}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {selectedDeviceId === device.id ? 'Ocultar Historial' : 'Mostrar Historial'}
              </button>
            </div>
            {selectedDeviceId === device.id && <StatusList deviceId={device.id} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DevicesList