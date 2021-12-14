import Container from './Container'

const ConsumerContainer = ({ children, ...props }) => {
  return (
    <Container {...props} sx={{ padding: 4 }}>
      {children}
    </Container>
  )
}

export default ConsumerContainer