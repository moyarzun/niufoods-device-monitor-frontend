import React, { useEffect, useState } from 'react'

const StatusList = ({ deviceId }) => {
  const [statusLogs, setStatusLogs] = useState([])

  useEffect(() => {
    const fetchStatusLogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/devices/${deviceId}/status_logs`)
        let data = await response.json()
        data = data.sort((a, b) => new Date(b.reported_at) - new Date(a.reported_at))
        setStatusLogs(data)
      } catch (error) {
        console.error('Error fetching status logs:', error)
      }
    }

    fetchStatusLogs()
    const intervalId = setInterval(fetchStatusLogs, 5000)

    return () => clearInterval(intervalId) // Limpiar el intervalo cuando el componente se desmonte
  }, [deviceId])

  return (
    <div>
      <ul>
        {statusLogs.map(statusLog => (
          <li key={`location_${statusLog.id}`}>
            [{statusLog.reported_at}] Status: {statusLog.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StatusList