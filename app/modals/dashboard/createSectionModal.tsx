import React from "react";
import PropTypes from "prop-types";

import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/components/form";
import Modal from "app/components/shared/Modal";

function CreateSectionModal({ refetch, show, onClose, ...props }) {
  const createSection = trpc.dashboard.createSection.useMutation({
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      title="Create New Section"
      {...props}
    >
      <Form
        submitText="Create Section"
        mutation={{
          schema: createSection.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <TextField name="name" label="Section Name" placeholder="Entrees" />
      </Form>
    </Modal>
  );
}

CreateSectionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CreateSectionModal;
