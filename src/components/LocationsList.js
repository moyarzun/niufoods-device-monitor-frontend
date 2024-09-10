import React, { useEffect, useState } from 'react'
import DevicesList from './DevicesList'

const LocationsList = () => {
  const [locations, setLocations] = useState([])
  const [selectedLocationId, setSelectedLocationId] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/locations')
        const data = await response.json()

        if (Array.isArray(data)) {
          setLocations(data)
        } else {
          console.error('Expected an array but got:', data)
          setLocations(data)
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    }

    fetchLocations()
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Locaciones</h1>
        <ul className="space-y-4">
          {locations.map(location => (
            <li
              key={`location_${location.id}`}
              onClick={() => setSelectedLocationId(location.id)}
              className={`cursor-pointer p-4 rounded-lg transition-colors duration-200 ${
                selectedLocationId === location.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-100'
              }`}
            >
              {location.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
        {selectedLocationId ? (
          <DevicesList locationId={selectedLocationId} />
        ) : (
          <p className="text-gray-500">Selecciona una locación para ver los dispositivos.</p>
        )}
      </div>
    </div>
  )
}

export default LocationsList