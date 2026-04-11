import React, { useState } from 'react'
import { createTask, updateTask, deleteTask } from '../api'

export default function TaskPanel({ tasks, selectedDate, onRefresh }) {
  const [title, setTitle] = useState('')
  const [mode, setMode] = useState('particular')
  const [date, setDate] = useState(selectedDate || new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const selectedDs = selectedDate || today

  const handleAdd = async () => {
    if (!title.trim()) { setError('Task title is required.'); return }
    setLoading(true)
    setError('')
    try {
      await createTask({
        title: title.trim(),
        is_daily: mode === 'daily',
        due_date: mode === 'particular' ? date : null,
      })
      setTitle('')
      onRefresh()
    } catch {
      setError('Failed to add task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed })
      onRefresh()
    } catch {
      setError('Failed to update task.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      if (editingTaskId === id) {
        cancelEdit()
      }
      onRefresh()
    } catch {
      setError('Failed to delete task.')
    }
  }

  const startEdit = (task) => {
    setEditingTaskId(task.id)
    setEditTitle(task.title)
    setEditDate(task.due_date || selectedDs)
    setError('')
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditTitle('')
    setEditDate('')
  }

  const handleSaveEdit = async (task) => {
    if (!editTitle.trim()) {
      setError('Task title is required.')
      return
    }

    try {
      await updateTask(task.id, {
        title: editTitle.trim(),
        due_date: task.is_daily ? null : editDate,
      })
      cancelEdit()
      onRefresh()
    } catch {
      setError('Failed to update task.')
    }
  }

  const visibleTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed
    if (filter === 'incomplete') return !t.completed
    if (t.is_daily) return true
    return t.due_date === selectedDs
  })

  const totalCount = tasks.length
  const doneCount = tasks.filter(t => t.completed).length
  const selectedCount = tasks.filter(t => t.is_daily || t.due_date === selectedDs).length

  return (
    <div style={s.wrap}>
      <div style={s.label}>TASK MANAGER</div>
      <h2 style={s.title}>Tasks</h2>

      <div style={s.addRow}>
        <input
          style={s.input}
          placeholder="Add a task"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <select style={s.select} value={mode} onChange={e => setMode(e.target.value)}>
          <option value="particular">Particular day</option>
          <option value="daily">Daily</option>
        </select>
        {mode === 'particular' && (
          <input type="date" style={s.dateInput} value={date} onChange={e => setDate(e.target.value)} />
        )}
        <button style={s.addBtn} onClick={handleAdd} disabled={loading}>
          {loading ? '...' : 'Add'}
        </button>
      </div>

      {error && <div style={s.error}>{error}</div>}

      <div style={s.stats}>
        <span style={s.stat}>{selectedCount} for selected day</span>
        <span style={s.stat}>{totalCount} total</span>
        <span style={s.stat}>{doneCount} done</span>
      </div>

      <div style={s.filterRow}>
        {['all', 'completed', 'incomplete'].map(f => (
          <button key={f} style={{ ...s.filterBtn, ...(filter === f ? s.filterActive : {}) }} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={s.list}>
        {visibleTasks.length === 0 ? (
          <div style={s.empty}>No tasks yet.</div>
        ) : (
          visibleTasks.map(task => (
            <div key={task.id} style={s.taskRow}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                style={s.checkbox}
              />
              <div style={s.taskInfo}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      style={s.editInput}
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSaveEdit(task)}
                    />
                    <div style={s.taskMeta}>
                      {task.is_daily ? (
                        <span style={s.badge}>Daily</span>
                      ) : (
                        <input
                          type="date"
                          style={s.editDateInput}
                          value={editDate}
                          onChange={e => setEditDate(e.target.value)}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span style={{ ...s.taskTitle, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : '#1a1a2e' }}>
                      {task.title}
                    </span>
                    <div style={s.taskMeta}>
                      {task.is_daily && <span style={s.badge}>Daily</span>}
                      {task.due_date && <span style={s.badgeDate}>{task.due_date}</span>}
                    </div>
                  </>
                )}
              </div>
              <div style={s.actions}>
                {editingTaskId === task.id ? (
                  <>
                    <button style={s.actionBtnPrimary} onClick={() => handleSaveEdit(task)} title="Save">Save</button>
                    <button style={s.actionBtn} onClick={cancelEdit} title="Cancel">Cancel</button>
                  </>
                ) : (
                  <button style={s.actionBtn} onClick={() => startEdit(task)} title="Edit">Edit</button>
                )}
                <button style={s.deleteBtn} onClick={() => handleDelete(task.id)} title="Delete">X</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const s = {
  wrap: { flex: 1, padding: '24px', minWidth: 0 },
  label: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#999', marginBottom: 4 },
  title: { fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 20 },
  addRow: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 },
  input: { flex: 1, minWidth: 140, border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14 },
  select: { border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', fontSize: 14, background: 'white', cursor: 'pointer' },
  dateInput: { border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 12px', fontSize: 14 },
  addBtn: { background: 'linear-gradient(90deg, #f97316, #ec4899)', color: 'white', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700 },
  error: { color: '#ef4444', fontSize: 13, marginBottom: 8 },
  stats: { display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
  stat: { background: '#f3f4f6', borderRadius: 999, padding: '4px 14px', fontSize: 13, color: '#555' },
  filterRow: { display: 'flex', gap: 8, marginBottom: 16 },
  filterBtn: { background: '#f3f4f6', border: 'none', borderRadius: 8, padding: '6px 16px', fontSize: 13, color: '#555', cursor: 'pointer' },
  filterActive: { background: '#6d28d9', color: 'white' },
  list: { display: 'flex', flexDirection: 'column', gap: 10 },
  empty: { color: '#aaa', fontSize: 14, padding: '20px 0' },
  taskRow: { display: 'flex', alignItems: 'center', gap: 12, background: 'white', borderRadius: 12, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  checkbox: { width: 18, height: 18, cursor: 'pointer', accentColor: '#6d28d9' },
  taskInfo: { flex: 1, minWidth: 0 },
  taskTitle: { fontSize: 15, fontWeight: 500, display: 'block' },
  editInput: { width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '8px 10px', fontSize: 14, marginBottom: 6 },
  editDateInput: { border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '6px 10px', fontSize: 12, background: 'white' },
  taskMeta: { display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' },
  badge: { fontSize: 11, background: '#ede9fe', color: '#6d28d9', borderRadius: 6, padding: '2px 8px', fontWeight: 600 },
  badgeDate: { fontSize: 11, background: '#fce7f3', color: '#db2777', borderRadius: 6, padding: '2px 8px' },
  actions: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  actionBtn: { background: '#f3f4f6', border: 'none', color: '#555', fontSize: 12, padding: '6px 10px', borderRadius: 8, cursor: 'pointer' },
  actionBtnPrimary: { background: '#6d28d9', border: 'none', color: 'white', fontSize: 12, padding: '6px 10px', borderRadius: 8, cursor: 'pointer' },
  deleteBtn: { background: 'none', border: 'none', color: '#ccc', fontSize: 14, padding: '4px 8px', borderRadius: 6, cursor: 'pointer', transition: 'color 0.15s' },
}
