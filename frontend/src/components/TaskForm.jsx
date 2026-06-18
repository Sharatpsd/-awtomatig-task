import React, { useState } from 'react'

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done']

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(STATUS_OPTIONS[0])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    try {
      await onAdd({ title, description, status })
      setTitle('')
      setDescription('')
      setStatus(STATUS_OPTIONS[0])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card task-form" onSubmit={handleSubmit} aria-label="Add task form">
      <div className="task-header">
        <div style={{display:'flex',flexDirection:'column'}}>
          <strong style={{fontSize:16,display:'flex',alignItems:'center',gap:8}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6v6l4 2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Create Task
          </strong>
          <span style={{fontSize:13,color:'#6b7280'}}>Add a new task to your board</span>
        </div>
      </div>

      <div>
        <label>Title</label>
        <input
          placeholder="e.g. Design landing page"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          placeholder="Optional details about the task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row">
        <div style={{flex:'0 0 220px'}}>
          <label>Status</label>
          <select className="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{flex:1,display:'flex',alignItems:'flex-end'}}>
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  )
}
