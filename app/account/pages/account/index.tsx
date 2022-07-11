import React, { useCallback, useState } from 'react'
import { BlitzPage, useMutation } from "blitz"

import loginMutation from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import Layout from "app/core/layouts/Layout"
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form"
import StripeCardElementModal from '../../components/StripeCardElementModal'

const Account: BlitzPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [login] = useMutation(loginMutation)
  const user = useCurrentUser();
  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  };

  const openHoursModal = useCallback(() => setShowPaymentModal(true), [])
  const closeHoursModal = useCallback(() => setShowPaymentModal(false), [])

  return (
    <React.Fragment>
      <ConsumerContainer maxWidth="sm">
        <Typography variant="h2" align="center">
          Your Account
        </Typography>
        <Form
          submitText="Update Password"
          schema={Login}
          initialValues={initialValues}
          mutation={{
            schema: login,
            toVariables: values => ({
              ...values
            })
          }}
        >
          <Typography variant="h6" sx={{ mt: 6 }}>
            <strong>Update Password</strong>
          </Typography>
            <TextField
              name="password"
              label="Current Password"
              placeholder="Current Password"
            />
            <TextField
              name="newPassword1"
              label="New Password"
              placeholder="New Password"
            />
            <TextField
              name="newPassword2"
              label="Confirm New Password"
              placeholder="Confirm New Password"
            />
        </Form>

        {/* Update Account */}
        <Form
          schema={Login}
          initialValues={initialValues}
          mutation={{
            schema: login,
            toVariables: values => ({
              ...values
            })
          }}
        >
          <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
            <strong>Personal Info</strong>
          </Typography>
          <Grid item container spacing={2}>
            <TextField
              disabled
              name="firstName"
              label="First Name"
              placeholder="First Name"
              md={6}
            />
            <TextField
              disabled
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              md={6}
            />
          </Grid>
        </Form>

        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Payment Method</strong>
        </Typography>

        {/* Delete Account */}
        <Typography variant="h6" sx={{ mt: 6 }} gutterBottom>
          <strong>Delete Your Account</strong>
        </Typography>
        <Button
          // color="red"
          variant="text"
        >
          Delete Account
        </Button>
      </ConsumerContainer>
      {/* <StripeCardElementModal
        show={showPaymentModal}
        onClose={closeHoursModal}
      /> */}
    </React.Fragment>
  )
}

Account.authenticate = { redirectTo: '/' }
Account.getLayout = (page) => <Layout>{page}</Layout>

export default Account;
