import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  Box
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import ModalFormEdit from '../ModalFormEdit'

export function Cards({ tasks, deleteTask, updateTask }) {
  const [showEdit, setShowEdit] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  const handleDelete = (id) => {
    deleteTask(id)
  }

  const handleModal = (task) => {
    setCurrentTask(task)
    setShowEdit(true)
  }

  const closeModal = () => {
    setShowEdit(false)
  }
  return (
    tasks && (
      <Container sx={{ mt: 4 }}>
        <Typography
          sx={{
            color: '#1976d2',
            textAlign: 'center'
          }}
          gutterBottom
          variant='h4'
          component='div'
        >
          Tasks Management
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {tasks.map((task) => (
            <Grid
              item
              key={task.task_id}
              xs={12}
              sm={6}
              lg={4}
              display='flex'
              justifyContent='center'
            >
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 280
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: '#1976d2'
                    }}
                    gutterBottom
                    variant='h5'
                    component='div'
                  >
                    {task.task_name}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary', marginBottom: 1 }}
                  >
                    {task.task_description}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary', marginBottom: 1 }}
                  >
                    Status: {task.task_status}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Deadline:{' '}
                    {new Date(task.task_deadline).toISOString().split('T')[0]}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <CardActions>
                    <SettingsIcon
                      onClick={() => handleModal(task)}
                      sx={{ fontSize: 25, color: '#1976d2', cursor: 'pointer' }}
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(task.task_id)}
                      sx={{ fontSize: 25, color: '#1976d2', cursor: 'pointer' }}
                    />
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {showEdit && (
          <ModalFormEdit
            updateTask={updateTask}
            task={currentTask}
            handleModal={handleModal}
            showEdit={showEdit}
            closeModal={closeModal}
          />
        )}
      </Container>
    )
  )
}
