import { useEffect, useState } from 'react'
import axios from 'axios'
import AddItemForm from './AddTaskForm'
import { Button } from 'react-bootstrap'

function TodoList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/tasks')
      const { error, data: responseData } = response.data

      if (error) {
        console.error('Error from server:', error)
      } else {
        console.log('Data from server:', responseData)
        setData(responseData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const onTaskCreate = async (newTask) => {
    try {
      await axios.post('http://localhost:4001/api/tasks', {
        type: newTask.type,
        title: newTask.title,
        status: newTask.status
      })
      fetchData()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/tasks/${id}`)
      fetchData()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const [editedTask, setEditedTask] = useState(null)

  const handleEdit = (task) => {
    setEditedTask(task)
  }

  const onUpdateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`http://localhost:4001/api/tasks/${taskId}`, updatedTask)
      setEditedTask(null)
      fetchData()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  return (
    <div className="mt-5">
      <AddItemForm
        onTaskCreate={onTaskCreate}
        onUpdateTask={onUpdateTask}
        editedTask={editedTask}
      />

      <div className="bar border p-3">
        <ul className="list-unstyled">
          {data.map((task, index) => (
            <li key={index} className="mt-2">
              <div className="task_bar rounded text-center align-items-center d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="item-label"></span>
                  <p className={`mb-0 ml-2 ${task.completed ? 'line_through' : ''}`}>{task.type}</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="item-label"></span>
                  <p className={`mb-0 ml-2 ${task.completed ? 'line_through' : ''}`}>
                    {task.title}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="item-label"></span>
                  <p className={`mb-0 ml-2 ${task.completed ? 'line_through' : ''}`}>
                    {task.status}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    className="mr-2"
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(task._id)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(task._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
