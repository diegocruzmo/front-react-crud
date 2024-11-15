import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { Link } from 'wouter'
import { registerUser } from '../../utils/auth'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [, setLocation] = useLocation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  const onSubmit = async ({ email, password, firstname, lastname }) => {
    const token = await registerUser({ email, password, firstname, lastname })
    localStorage.setItem('token', token)

    if (token) {
      setLocation('/dashboard')
      toast.success('Registered successful!')
    }
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <Container maxWidth='sm'>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h4' component='h1' align='center' gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='firstname'
              control={control}
              defaultValue=''
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='First name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.firstname}
                  helperText={errors.firstname ? errors.firstname.message : ''}
                />
              )}
            />
            <Controller
              name='lastname'
              control={control}
              defaultValue=''
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Last Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.lastname}
                  helperText={errors.lastname ? errors.lastname.message : ''}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  type='password'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ''
                  }
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
              Sign Up
            </Button>
            <Typography
              sx={{ display: 'block', mt: 2 }}
              component={Link}
              align='center'
              href='/'
            >
              If you already have an account, please click here!
            </Typography>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default SignUp
