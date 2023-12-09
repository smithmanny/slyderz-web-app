import React from "react";

import { AddUserAddress } from "validations/userValidations";
import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/components/form";
import Modal from "app/components/shared/Modal";

const AddAddressModal = ({ show, onClose, ...props }) => {
  const utils = trpc.useUtils();
  const addAddressMutation = trpc.user.createAddress.useMutation({
    onSuccess: async (input) => {
      await utils.user.fetchUserData.invalidate();
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
