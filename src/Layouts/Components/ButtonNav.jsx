import React from 'react'
import { Button } from '@chakra-ui/react'

const ButtonNav = ({ colorScheme, variant, text, onClick }) => {
  return (
    <Button
      colorScheme={colorScheme}
      variant={variant}
      h='40px'
      w='100px'
      borderRadius='10px'
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default ButtonNav
