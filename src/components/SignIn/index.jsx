import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { Link } from 'wouter'
import { loginUser } from '../../utils/auth'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'

const SignIn = () => {
  const [, setLocation] = useLocation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    const token = await loginUser({ email, password })
    localStorage.setItem('token', token)

    if (token) {
      setLocation('/dashboard')
      toast.success('Login successful!')
    }
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <Container maxWidth='sm'>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h4' component='h1' align='center' gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              href='/signup'
            >
              If you have not an account, please click here!
            </Typography>
          </form>
        </Box>
      </Container>
    </div>
  )
}

export default SignIn
