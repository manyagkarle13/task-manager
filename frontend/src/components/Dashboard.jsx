import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import TaskPanel from './TaskPanel'
import { getTasks } from '../api'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [fetchError, setFetchError] = useState('')

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
      setFetchError('')
    } catch {
      setFetchError('Could not connect to backend. Make sure Django is running.')
    }
  }

  useEffect(() => { fetchTasks() }, [])

  return (
    <div style={s.outer}>
      <div style={s.card}>
        {fetchError && <div style={s.error}>{fetchError}</div>}
        <div style={s.inner}>
          <Calendar tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <div style={s.divider} />
          <TaskPanel tasks={tasks} selectedDate={selectedDate} onRefresh={fetchTasks} />
        </div>
      </div>
    </div>
  )
}

const s = {
  outer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { background: 'white', borderRadius: 32, maxWidth: 1100, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', overflow: 'hidden' },
  error: { background: '#fef2f2', color: '#ef4444', padding: '12px 24px', fontSize: 14, borderBottom: '1px solid #fecaca' },
  inner: { display: 'flex', minHeight: 600 },
  divider: { width: 1, background: '#f0f0f0' },
}
