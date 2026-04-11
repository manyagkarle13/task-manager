import React, { useState } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Calendar({ tasks, selectedDate, onSelectDate }) {
  const [current, setCurrent] = useState(new Date())

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const today = new Date()

  const cells = []
  // prev month
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, curr: false })
  // current
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, curr: true })
  // next
  let next = 1
  while (cells.length % 7 !== 0) cells.push({ day: next++, curr: false })

  const taskCountForDay = (d) => {
    const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    return tasks.filter(t => t.due_date === ds).length
  }

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const isSelected = (d) => {
    if (!selectedDate) return false
    const sd = new Date(selectedDate)
    return d === sd.getDate() && month === sd.getMonth() && year === sd.getFullYear()
  }

  const selectDay = (d) => {
    const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    onSelectDate(ds)
  }

  const selDay = selectedDate ? new Date(selectedDate + 'T00:00:00') : today
  const dailyCount = tasks.filter(t => t.is_daily).length
  const particularCount = tasks.filter(t => {
    if (!t.due_date) return false
    const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(selDay.getDate()).padStart(2,'0')}`
    return t.due_date === ds && !t.is_daily
  }).length
  const doneCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length > 0 ? Math.round((doneCount/tasks.length)*100) : 0

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <span style={s.label}>CALENDAR</span>
        <div style={s.nav}>
          <button style={s.navBtn} onClick={() => setCurrent(new Date(year, month-1, 1))}>{'<'}</button>
          <button style={s.navBtnActive}>Today</button>
          <button style={s.navBtn} onClick={() => setCurrent(new Date(year, month+1, 1))}>{'>'}</button>
        </div>
      </div>
      <h2 style={s.monthTitle}>{MONTHS[month]} {year}</h2>

      <div style={s.grid}>
        {DAYS.map(d => <div key={d} style={s.dayLabel}>{d}</div>)}
        {cells.map((cell, i) => (
          <div
            key={i}
            onClick={() => cell.curr && selectDay(cell.day)}
            style={{
              ...s.cell,
              color: cell.curr ? '#222' : '#bbb',
              cursor: cell.curr ? 'pointer' : 'default',
              background: isSelected(cell.day) && cell.curr ? '#6d28d9'
                : isToday(cell.day) && cell.curr ? '#e9e0ff' : 'transparent',
              color: isSelected(cell.day) && cell.curr ? 'white' : cell.curr ? '#222' : '#bbb',
            }}
          >
            <span>{cell.day}</span>
            {cell.curr && taskCountForDay(cell.day) > 0 && (
              <div style={s.taskDot}>{taskCountForDay(cell.day)} task</div>
            )}
          </div>
        ))}
      </div>

      {/* Selected day details */}
      <div style={s.detailBox}>
        <div style={s.detailLabel}>SELECTED DAY DETAILS</div>
        <div style={s.detailDate}>
          {selDay.getDate()} {MONTHS[selDay.getMonth()].slice(0,3)} {selDay.getFullYear()}
        </div>
        <div style={s.detailCards}>
          <div style={s.detailCard}><div style={s.dcLabel}>Daily tasks</div><div style={s.dcVal}>{dailyCount}</div></div>
          <div style={s.detailCard}><div style={s.dcLabel}>Particular-day tasks</div><div style={s.dcVal}>{particularCount}</div></div>
          <div style={s.detailCard}><div style={s.dcLabel}>Completion</div><div style={s.dcVal}>{totalCount}%</div></div>
        </div>
      </div>
    </div>
  )
}

const s = {
  wrap: { flex: '0 0 auto', width: 580, padding: '24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  label: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#999' },
  nav: { display: 'flex', gap: 6 },
  navBtn: { background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: '4px 12px', fontSize: 13, color: '#444', cursor: 'pointer' },
  navBtnActive: { background: '#6d28d9', border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 13, color: 'white', cursor: 'pointer' },
  monthTitle: { fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 },
  dayLabel: { textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#999', padding: '4px 0', letterSpacing: '0.05em' },
  cell: { borderRadius: 10, padding: '8px 4px', textAlign: 'center', fontSize: 14, fontWeight: 500, minHeight: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 2, transition: 'background 0.15s' },
  taskDot: { fontSize: 10, color: '#6d28d9', background: '#ede9fe', borderRadius: 4, padding: '1px 4px' },
  detailBox: { marginTop: 20, border: '1px solid #e5e7eb', borderRadius: 12, padding: '16px' },
  detailLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#999', marginBottom: 4 },
  detailDate: { fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#1a1a2e' },
  detailCards: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
  detailCard: { background: '#f9fafb', borderRadius: 10, padding: '12px' },
  dcLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  dcVal: { fontSize: 22, fontWeight: 800, color: '#1a1a2e' },
}
