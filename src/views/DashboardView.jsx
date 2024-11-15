import Dashboard from '../components/Dashboard'
import { Fab, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import ModalForm from '../components/ModalForm'

const DashboardView = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <Fab onClick={handleModal} color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
      {openModal && (
        <ModalForm openModal={openModal} handleModal={handleModal} />
      )}
    </>
  )
}

export default DashboardView
