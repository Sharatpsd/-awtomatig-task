import React from 'react'
import TaskCard from './TaskCard'

export default function TaskList({ tasks, loading, onUpdate, onDelete }) {
  if (loading) return <div className="card">Loading tasks...</div>
  if (!tasks || tasks.length === 0)
    return (
      <div className="card empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7h18" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 11h12" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 15h4" stroke="#c7d2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3>No tasks yet</h3>
        <p className="muted">Create your first task using the form on the left.</p>
      </div>
    )

  return (
    <div className="list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  )
}
