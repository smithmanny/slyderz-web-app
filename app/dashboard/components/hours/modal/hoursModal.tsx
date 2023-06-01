import React from "react";

import { todAM, todPM, weekdays } from "app/utils/time";
import { trpc } from "server/utils/trpc";

import Form, { Checkbox, Select } from "app/core/components/form";
import Modal from "app/core/components/shared/Modal";

type CreateSectionModalProps = {
  show: boolean;
  onClose: () => void;
  refetch: () => void;
};

const CreateSectionModal = ({
  refetch,
  show,
  onClose,
  ...props
}: CreateSectionModalProps) => {
  const createHours = trpc.dashboard.createHours.useMutation({
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
      title="Create Hours"
      {...props}
    >
      <Form
        submitText="Save Hours"
        // schema={Login}
        mutation={{
          schema: createHours.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <Checkbox label="Select Days" name="daysOfWeek" data={weekdays} />
        <Select
          label="Start Time"
          name="startTime"
          items={todAM}
          variant="outlined"
          md={6}
          required
        />
        <Select
          label="End Time"
          name="endTime"
          items={todPM}
          variant="outlined"
          md={6}
          required
        />
      </Form>
    </Modal>
  );
};

export default CreateSectionModal;
