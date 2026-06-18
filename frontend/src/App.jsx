import React, { useEffect, useState, useRef } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import api from './services/api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.getTasks()
      setTasks(res.data)
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (task) => {
    await api.createTask(task)
    fetchTasks()
  }

  const updateTask = async (id, updates) => {
    await api.updateTask(id, updates)
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await api.deleteTask(id)
    fetchTasks()
  }

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-title">Task Manager</div>
            <div className="hero-sub">Modern, minimal task dashboard</div>
          </div>

          <div className="hero-right">
            <div className="stat card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7h18" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11h12" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 15h4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="stat-number">{tasks.length}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div className="grid">
          <div className="left">
            <TaskForm onAdd={addTask} ref={formRef} />
          </div>

          <div className="right">
            {error && <div className="error">{error}</div>}

            <TaskList
              tasks={tasks}
              loading={loading}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </main>

      <footer className="footer">Built with React, Vite & Axios</footer>
    </div>
  )
}
