import React from "react";

import { useAppDispatch } from "integrations/redux";
import { AddUserAddress } from "app/users/validations";
import { addAddress } from "integrations/redux/reducers/userReduer";
import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/core/components/form";
import Modal from "app/core/components/shared/Modal";

const AddAddressModal = ({ show, onClose, ...props }) => {
  const dispatch = useAppDispatch();
  const addAddressMutation = trpc.user.createAddress.useMutation({
    onSuccess: (input) => {
      dispatch(addAddress(input));
      return onClose();
    },
  });

  return (
    <Modal closeModal={onClose} show={show} size="sm" {...props}>
      <Form
        submitText="Add Address"
        schema={AddUserAddress}
        mutation={{
          schema: addAddressMutation.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <TextField
          autoComplete="address-line1"
          name="address1"
          label="Street name"
        />
        <TextField
          autoComplete="address-line2"
          name="address2"
          label="Address cont..."
        />
        <TextField
          autoComplete="address-level2"
          name="city"
          md={6}
          label="City"
        />
        <TextField
          autoComplete="address-level1"
          name="state"
          md={6}
          disabled
          label="State"
          value="Georgia"
        />
        <TextField
          autoComplete="postal-code"
          name="zipcode"
          md={6}
          label="Zipcode"
          type="number"
        />
      </Form>
    </Modal>
  );
};

export default AddAddressModal;
