import { Button, useTheme } from '@mui/material';
import React from 'react';

function SignWithButton({ content, Icon ,color,handleOnClick}) { 
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{ 
        fontWeight: 'bold',
        color: theme.palette.primary.teal ,
        borderColor:theme.palette.primary.teal ,
        mb: '8px',
        textTransform: 'none'
      }}
      startIcon={<Icon sx={{color:color}} />} 
      onClick={handleOnClick}
    >
      {content}
    </Button>
  );
}

export default SignWithButton;