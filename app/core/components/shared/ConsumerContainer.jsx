import { styled } from "integrations/material-ui"

import Container from './Container'

const SlyderzContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0),
}))

const ConsumerContainer = ({ children, ...props }) => {
  return (
    <SlyderzContainer {...props}>
      {children}
    </SlyderzContainer>
  )
}

export default ConsumerContainer