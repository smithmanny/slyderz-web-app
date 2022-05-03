import React from 'react';
import { Image, useMutation } from "blitz"
import PropTypes from 'prop-types'
import InputAdornment from '@mui/material/InputAdornment';

import { styled } from 'integrations/material-ui'
import Form, { TextField } from "app/core/components/form"

import Modal from 'app/core/components/shared/Modal'

const ModalContainer = styled('div')({
  minHeight: "500px"
})

const CreateDishModal = ({ show, onClose, ...props }) => {
  // const [addMenuItemToCart] = useMutation(addMenuItemToCartMutation);
  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      title="Create New Dish"
      {...props}
    >
      <Form
        submitText="Create Dish"
        // schema={Login}
        // initialValues={initialValues}
        mutation={{
          // schema: login,
          toVariables: values => ({
            ...values
          })
        }}
      >
        <TextField
          name="name"
          label="Dish Name"
          placeholder="Air-Fried Chipotle Wings"
        />
        <TextField
          name="price"
          label="Dish Price"
          placeholder="22.00"
          type="number"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
        <TextField
          name="description"
          label="Dish Description"
          placeholder="Hand breaded wings Air-Fried and dipped in chipotle sauce"
          multiline
          minRows={3}
        />
      </Form>
    </Modal>
  )
}

CreateDishModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CreateDishModal;