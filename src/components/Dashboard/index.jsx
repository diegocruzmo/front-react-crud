import { useEffect } from 'react'
import { useState } from 'react'
import Header from '../Header'
import { useLocation } from 'wouter'
import { Cards } from '../Cards'
import { useTasks } from '../../hooks/useTasks'

const Dashboard = () => {
  const [, setLocation] = useLocation()
  const [name, setName] = useState('')
  const { getTasks, tasks, deleteTask, updateTask } = useTasks()

  const getName = async () => {
    try {
      const res = await fetch('http://localhost:3000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data')
      }

      const data = await res.json()
      setName(data[0].user_firstname)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    if (!localStorage.token) {
      setLocation('/')
      return
    }
    getName()
    getTasks()
  }, [setLocation, tasks])

  return (
    <>
      <Header name={name} />
      <Cards tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </>
  )
}

export default Dashboard
