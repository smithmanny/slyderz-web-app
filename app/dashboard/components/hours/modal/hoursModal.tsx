import { useMutation } from "@blitzjs/rpc";
import React from 'react';
import PropTypes from 'prop-types'

import createHoursMutation from "app/dashboard/mutations/createHoursMutation"

import { todAM, todPM, weekdays } from 'app/utils/time'

import Grid from "app/core/components/shared/Grid"
import Form, { Checkbox, Select } from "app/core/components/form"
import Modal from 'app/core/components/shared/Modal'

const CreateSectionModal = ({ refetch, show, onClose, ...props }) => {
  const [createHours] = useMutation(createHoursMutation)
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
          schema: createHours,
          toVariables: values => ({
            ...values
          })
        }}
        onSuccess={() => {
          refetch();
          onClose();
        }}
      >
        <Checkbox
          label="Select Days"
          name="daysOfWeek"
          data={weekdays}
        />
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
  )
}

CreateSectionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
}

export default CreateSectionModal;