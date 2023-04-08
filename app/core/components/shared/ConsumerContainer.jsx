import { styled } from "integrations/material-ui"

import Container from './Container'

const SlyderzContainer = styled(Container)(({ theme }) => ({
  // [theme.breakpoints.up('md')]: {
  //   padding: theme.spacing(0),
  // },
}))

const ConsumerContainer = ({ children, ...props }) => {
  return (
    <SlyderzContainer maxWidth="xl" {...props}>
      {children}
    </SlyderzContainer>
  )
}

export default ConsumerContainer