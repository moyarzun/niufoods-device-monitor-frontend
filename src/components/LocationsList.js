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
    <div>
      <h1>Lista de Locaciones</h1>
      <ul>
        {locations.map(location => (
          <li key={`location_${location.id}`} onClick={() => setSelectedLocationId(location.id)}>
            {location.name}
          </li>
        ))}
      </ul>
      {selectedLocationId && <DevicesList locationId={selectedLocationId} />}
    </div>
  )
}

export default LocationsList