import React, { useEffect, useState, useRef } from 'react';
import { getAntiCSRFToken, BlitzPage, Link, Routes, getSession } from "blitz";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import ArrowBack from '@mui/icons-material/ArrowBack';

import { transfromDateToReadableTime } from "app/helpers/dateHelpers"
import { styled } from "integrations/material-ui";
import { CartItem } from 'types'

import Form, { Select } from 'app/core/components/form';
import Alert from 'app/core/components/shared/Alert';
import Button from "app/core/components/shared/Button"
import Layout from "app/core/layouts/Layout";
import CartSummary from 'app/core/components/cart/cartSummary'
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer';
import Grid from 'app/core/components/shared/Grid';
import Typography from 'app/core/components/shared/Typography'
import Modal from 'app/core/components/shared/Modal'

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

interface DataType {
  clientSecret: string
  id: Number
}

const StripeCardElementModal = ({ show, onClose, ...props }) => {
  const antiCSRFToken = getAntiCSRFToken();
  const setupIntentId: any = useRef();
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!stripe || !elements || setupIntentId) {
      return
    };

    const { error }:any = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: 'http://localhost:3000',
      }
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      onClose()
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function createStripeSetupIntent() {
      let data: DataType | null = null;

      try {
        const res = await fetch("/api/stripe/create-setup-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "anti-csrf": antiCSRFToken,
          },
        });
        data = await res.json();
      } catch (err) {
        console.error(err)
      } finally {
        if (data) {
          setClientSecret(data.clientSecret);
          setupIntentId.current = data.id
        }
      }
    }

    createStripeSetupIntent();
  }, []);

  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      title="Add Payment Method"
      {...props}
    >
      {clientSecret && (
        <React.Fragment>
          <PaymentElement id="payment-element" />
          <Button type="submit" sx={{ mt: 2 }} onClick={handleSubmit}>
            Save Card
          </Button>
        </React.Fragment>
      )}
    </Modal>
  )
}

export default StripeCardElementModal;