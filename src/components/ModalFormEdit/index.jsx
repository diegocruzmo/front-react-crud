import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Typography, Box, Modal } from '@mui/material'

const ModalFormEdit = ({
  task,
  showEdit,
  handleModal,
  updateTas,
  closeModal,
  updateTask
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleClose = () => {}

  const onSubmit = (data) => {
    const newData = { ...data, task_id: task.task_id }
    closeModal()
    updateTask(newData)
  }

  return (
    <div>
      <Modal
        open={showEdit}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant='h4' component='h1' align='center' gutterBottom>
            Edit Task
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              defaultValue={task.task_name}
              rules={{ required: 'Task name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Task Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            />

            <Controller
              name='description'
              control={control}
              defaultValue={task.task_description}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : ''
                  }
                />
              )}
            />

            <Controller
              name='status'
              control={control}
              defaultValue={task.task_status}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Status'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                />
              )}
            />

            <Controller
              name='deadline'
              control={control}
              defaultValue=''
              rules={{
                required: 'Deadline is required',
                validate: (value) => {
                  if (isNaN(new Date(value).getTime())) {
                    return 'Invalid date'
                  }
                  return true
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Deadline'
                  type='date'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={!!errors.deadline}
                  helperText={errors.deadline ? errors.deadline.message : ''}
                />
              )}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalFormEdit
