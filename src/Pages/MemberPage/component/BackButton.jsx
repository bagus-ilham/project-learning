import React from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ text }) => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1)}
  return (
    <Button leftIcon={<ArrowBackIcon />} onClick={handleBack}>
      {text}
    </Button>
  )
}

export default BackButton;
