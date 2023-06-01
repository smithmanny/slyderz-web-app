import React from "react";
import PropTypes from "prop-types";

import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/core/components/form";
import Modal from "app/core/components/shared/Modal";

const CreateSectionModal = ({ refetch, show, onClose, ...props }) => {
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
        // schema={Login}
        mutation={{
          schema: createSection.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
        onSuccess={() => {
          refetch();
          onClose();
        }}
      >
        <TextField name="name" label="Section Name" placeholder="Entrees" />
      </Form>
    </Modal>
  );
};

CreateSectionModal.propTypes = {
  createSection: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CreateSectionModal;
