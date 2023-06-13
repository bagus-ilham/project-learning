import { useToast } from '@chakra-ui/react'
import React from 'react'

function ToastComponent(props) {
	const toast = useToast()
	console.log('ji')
	
		toast({
			title: props?.title ? props.title : 'title tidak terisi',
			description: props?.description ? props.description : 'description tidak terisi',
			status: props?.status ? props.status : 'status tidak terisi',
			duration: 9000,
			isClosable: true,
		})
	
}

export default ToastComponent