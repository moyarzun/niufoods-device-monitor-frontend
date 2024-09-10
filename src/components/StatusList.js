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
    <div className="overflow-x-auto py-2">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Hora</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Estado</th>
          </tr>
        </thead>
        <tbody>
          {statusLogs.map(statusLog => (
            <tr key={`status_${statusLog.id}`}>
              <td className="py-2 px-4 border-b border-gray-200">{new Date(statusLog.reported_at).toLocaleString()}</td>
              <td className="py-2 px-4 border-b border-gray-200">{statusLog.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatusList