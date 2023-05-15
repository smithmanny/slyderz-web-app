import Container from './Container'
import NoSSR from '../NoSSR'

export const NoSSrConsumerContainer = ({ children, ...props }) => {
  return (
    <Container maxWidth="xl" {...props}>
      <NoSSR>
        {children}
      </NoSSR>
    </Container>
  )
}

const ConsumerContainer = ({ children, ...props }) => {
  return (
    <Container maxWidth="xl" {...props}>
      {children}
    </Container>
  )
}

export default ConsumerContainer