import React, { useState } from 'react'

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done']

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [status, setStatus] = useState(task.status || 'To Do')
  const [saving, setSaving] = useState(false)

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    setSaving(true)
    try {
      await onUpdate(task.id, { ...task, status: newStatus })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return
    await onDelete(task.id)
  }

  const badgeClass = (s) => {
    if (!s) return 'badge todo'
    if (s.toLowerCase().includes('progress')) return 'badge inprogress'
    if (s.toLowerCase().includes('done')) return 'badge done'
    return 'badge todo'
  }

  const statusClass = status.toLowerCase().includes('progress') ? 'inprogress' : status.toLowerCase().includes('done') ? 'done' : 'todo'

  return (
    <div className={`task-card ${statusClass}`}>
      <div className="task-header">
        <div style={{display:'flex',flexDirection:'column'}}>
          <div className="task-title">{task.title}</div>
          {task.description && <div className="task-desc">{task.description}</div>}
        </div>

        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <span className={badgeClass(status)}>{status}</span>
        </div>
      </div>

      <div className="meta">
        <select className="status-select" value={status} onChange={handleStatusChange}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="actions">
          <button className="btn secondary" onClick={() => onUpdate(task.id, task)} disabled={saving} title="Save changes">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{marginLeft:8}}>Save</span>
          </button>
          <button className="btn danger" onClick={handleDelete} title="Delete task">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{marginLeft:8}}>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
