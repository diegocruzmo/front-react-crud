import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'

const Header = ({ name }) => {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    localStorage.removeItem('token')
    setLocation('/')
    toast.success('Logout successful!')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Hi, {name}
          </Typography>

          <Button onClick={handleClick} color='inherit'>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}

export default Header
