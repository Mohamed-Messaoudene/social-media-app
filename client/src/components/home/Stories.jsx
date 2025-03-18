import { Box } from '@mui/material'
import React from 'react'
import Story from './Story'
import AddNewStory from './AddNewStory'

function Stories() {
  return (
    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
    <AddNewStory imgUrl="/story1.jpeg"/>
    <Story imgUrl="/story2.jpeg" username="berkane" />
    <Story imgUrl="/story3.jpeg" username="ali boucetta" />
    <Story imgUrl="/story4.jpeg" username="boumedian" />
    <Story imgUrl="/story5.jpeg" username="abd elnour"/>
  </Box>
  )
}

export default Stories