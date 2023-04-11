import Container from './Container'

const ConsumerContainer = ({ children, ...props }) => {
  return (
    <Container maxWidth="xl" {...props}>
      {children}
    </Container>
  )
}

export default ConsumerContainer