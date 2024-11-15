import { useState } from 'react'
import toast from 'react-hot-toast'

export const useTasks = () => {
  const [tasks, setTasks] = useState()

  const addTask = async (data) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('token', localStorage.token)

      const body = data
      await fetch('http://localhost:3000/dashboard/tasks', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
      })

      toast.success('Task added!')
    } catch (error) {
      const errorMessage = error.message
      toast.error(errorMessage)
    }
  }

  const getTasks = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('token', localStorage.token)

      const res = await fetch('http://localhost:3000/dashboard', {
        method: 'GET',
        headers: myHeaders
      })
      const todoArray = await res.json()
      setTasks(todoArray)
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/dashboard/tasks/${id}`, {
        method: 'DELETE',
        headers: { token: localStorage.token }
      })
      setTasks(tasks.filter((task) => task.task_id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateTask = async (task) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('token', localStorage.token)
      const id = task.task_id
      const body = task
      delete body['task_id']
      //console.log(id)
      await fetch(`http://localhost:3000/dashboard/tasks/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body)
      })

      toast.success('Task updated!')
    } catch (error) {
      console.log(error.message)
    }
  }

  return { addTask, getTasks, tasks, deleteTask, updateTask }
}
