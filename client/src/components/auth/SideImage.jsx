import { Box } from '@mui/material'
import React from 'react'

function SideImage({url,alt}) {
  return (
    <Box
        width="50%"
        height="100%"
        sx={{
          display:"flex",
          alignItems:"center"
        }}
      >
        <img src={url} alt={alt} width="100%" />
        </Box>
  )
}

export default SideImage