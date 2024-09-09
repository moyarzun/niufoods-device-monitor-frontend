import React, { useEffect, useState } from 'react'

const StatusList = ({ deviceId }) => {
  const [statusLogs, setStatusLogs] = useState([])

  useEffect(() => {
    const fetchStatusLogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/devices/${deviceId}/status_logs`)
        const data = await response.json()
        setStatusLogs(data)
      } catch (error) {
        console.error('Error fetching status logs:', error)
      }
    }

    fetchStatusLogs()
  }, [])

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