import React from 'react'
import { Container,Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
const Homepage = () => {
  return (
    <Container maxW='xl' centerContent>

    <Box d="flex" justifyContent="center" p={3} bg={'black'}
    w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" >
      <Text fontSize="3xl" color='white' >Baghel Talk</Text>
    </Box>

    <Box bg="black" w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb={"2em"} borderBottom={"1px"} borderColor={"white"} pb="15px">
    <Tab width={'50%'} color='white' >Login</Tab>
    <Tab width={'50%'} color='white'>Signup</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default Homepage