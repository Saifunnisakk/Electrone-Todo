/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'

function AddItemForm({ onTaskCreate, onUpdateTask, editedTask }) {
  const [newTask, setNewTask] = useState({
    type: '',
    title: '',
    status: 'todo'
  })

  useEffect(() => {
    // Update the form fields when editedTask changes
    if (editedTask) {
      setNewTask({
        type: editedTask.type || '',
        title: editedTask.title || '',
        status: editedTask.status || 'todo'
      })
    }
  }, [editedTask])

  const onCreateOrUpdate = (e) => {
    e.preventDefault()
    if (editedTask) {
      // If editedTask exists, update the task
      onUpdateTask(editedTask._id, newTask)
    } else {
      // If editedTask doesn't exist, create a new task
      onTaskCreate(newTask)
    }

    // Reset the form after creating/updating the task
    setNewTask({
      type: '',
      title: '',
      status: 'todo'
    })
  }

  return (
    <>
      <Form onSubmit={onCreateOrUpdate} className="mb-5">
        <InputGroup>
          <FormControl
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
            type="text"
            placeholder="Type"
            value={newTask.type}
          ></FormControl>
          <FormControl
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            type="text"
            placeholder="Enter new task..."
            value={newTask.title}
          ></FormControl>
          <FormControl
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            type="text"
            placeholder="Status"
            value={newTask.status}
          ></FormControl>
          <Button type="submit" variant="primary" disabled={!newTask.type || !newTask.title}>
            {editedTask ? 'Update' : 'ADD'}
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}

export default AddItemForm
