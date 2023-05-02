import { useMutation } from "@blitzjs/rpc";
import React, { useState } from 'react';

import Form, { DatePicker, Select, TextField } from 'app/core/components/form'
import Modal from 'app/core/components/shared/Modal'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import Grid from 'app/core/components/shared/Grid'

const AddAddressModal = ({ show, onClose, ...props }) => {
  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      actions={(
        <Button
          label="Add address"
          color="primary"
          variant="contained"
          // onClick={updateCart}
        >
          Add Address
        </Button>
      )}
      {...props}
    >
      <Form>
        <TextField
          name="address1"
          label="Street name"
        />
        <TextField
          name="address2"
          label="Address cont..."
        />
        <TextField
          name="city"
          md={6}
          label="City"
        />
        <TextField
          name="state"
          md={6}
          disabled
          label="State"
          value="Georgia"
        />
        <TextField
          name="zipcode"
          md={6}
          label="Zipcode"
        />
      </Form>
    </Modal>
  )
}

export default AddAddressModal;