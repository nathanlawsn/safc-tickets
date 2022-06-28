import Head from 'next/head'
import Script from 'next/script'
import { Box, Center, CircularProgress, CircularProgressLabel, Container, Grid, GridItem, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { IoTicketOutline } from "react-icons/io5"

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>SAFC Ticket Tracker</title>
        <meta name="description" content="Track ticket sales for upcoming Sunderland AFC fixtures at the Stadium of Light" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YEZY97Z1L8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YEZY97Z1L8');
        `}
      </Script>

      <Box as='header' bg='red.600' color='white' p='10'>
        <Container maxW='1200px'>
          <Box display='flex' alignItems='center' gap={2}>
            <Icon as={IoTicketOutline} w={8} h={8} />
            <Heading as='h1' size='lg'>SAFC Ticket Tracker</Heading>
          </Box>
        </Container>
      </Box>

      <Box as='main' py='10'>
        <Container maxW='1200px'>

          <Heading as='h2' size='md'>Season Ticket Sales</Heading>

          <SimpleGrid columns={[1, 1, 2]} gap='6' py='8'>

            <Box>

              <SimpleGrid columns='1' gap='6'>
              
                <GridItem>
                  <Box boxShadow='base' w="100%" borderRadius='lg' p='6'>
                    <Text fontSize='lg'>Available:</Text>
                     <Text fontSize='xl' fontWeight='500'>{data.available}</Text>
                  </Box>
                </GridItem>

                <GridItem>
                  <Box boxShadow='base' w="100%" 
                     borderRadius='lg' p='6'>
                    <Text fontSize='lg'>Sold:</Text>
                    <Text fontSize='xl' fontWeight='500'>{data.sold}</Text>
                  </Box>
                </GridItem>

                <GridItem>
                  <Box w="100%" boxShadow='base' borderRadius='lg' p='6'>
                    <Text fontSize='lg'>Total Seats Made Available for Sale:</Text>
                    <Text fontSize='xl' fontWeight='500'>{data.totalSeatsMadeAvailableForSale}</Text>
                    <Text color='gray.500' fontSize='sm' pt='1'>*Excludes corporate and away fans sales</Text>
                  </Box>
                </GridItem>

              </SimpleGrid>

            </Box>

              <Box w="100%" h="100%" display='flex' flexDirection='column' justifyContent='center' boxShadow='base' borderRadius='lg' p='6'>
                <Text align='center' fontSize='lg'>Percentage Sold</Text>
                <Center pt='6'>
                  <CircularProgress value={data.percentageSold} size='240px' color='red.600'>
                    <CircularProgressLabel fontSize='4xl' fontWeight='500'>{data.percentageSold}%</CircularProgressLabel>
                  </CircularProgress>
                </Center>
              </Box>
          
          </SimpleGrid>

          <Text color="gray.500" fontSize='sm'>The information contained in this website is for general information purposes only. If you&apos;re looking to purchase SAFC tickets then you need to visit <a href="https://www.eticketing.co.uk/safc">eticketing.co.uk/safc</a></Text>

        </Container>
      </Box>

      <Box as='footer'>
        <Container maxW='1200px'>
          <Box borderTop='1px' borderColor='gray.100' pt='8'>
            <Text>Developed by <a href="https://nathanlawson.co.uk">Nathan Lawson</a> &bull; Ha&apos;way The Lads</Text>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://safcticketing.azurewebsites.net/api/tickets`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
