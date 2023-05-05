import React from 'react';
import { useMutation } from "@blitzjs/rpc";

import { useAppDispatch } from "integrations/redux";
import updateUserAddress from 'app/users/mutations/updateUserAddressMutation';
import { AddUserAddress } from 'app/users/validations';
import { addAddress } from 'integrations/redux/reducers/userReduer';

import Form, { TextField } from 'app/core/components/form'
import Modal from 'app/core/components/shared/Modal'

const AddAddressModal = ({ show, onClose, ...props }) => {
  const [addAddressSchema] = useMutation(updateUserAddress)
  const dispatch = useAppDispatch()

  const onSuccess = (input) => {
    dispatch(addAddress(input))
    return onClose()
  }

  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      {...props}
    >
      <Form
        submitText='Add Address'
        schema={AddUserAddress}
        mutation={{
          schema: addAddressSchema,
          toVariables: values => ({
            ...values,
          })
        }}
        onSuccess={onSuccess}
      >
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
          type='number'
        />
      </Form>
    </Modal>
  )
}

export default AddAddressModal;