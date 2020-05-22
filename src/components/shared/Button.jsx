import React from 'react'
import { default as MuiButton } from '@material-ui/core/Button'

const Button = ({ children, ...props }) => (
  <MuiButton {...props}>
    {children}
  </MuiButton>
)

export default Button;