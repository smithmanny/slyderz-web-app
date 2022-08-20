import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import Alert from 'app/core/components/shared/Alert';
import Button from "app/core/components/shared/Button"
import Modal from 'app/core/components/shared/Modal'

const promise = loadStripe("pk_test_GrN77dvsAhUuGliIXge1nUD8");

interface DataType {
  clientSecret: string
  id: Number
}

const StripeCard: FunctionComponent<any> = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error }: any = await stripe.confirmSetup({
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
      props.onClose()
    }
  };

  return (
    <React.Fragment>
      <PaymentElement id="payment-element" />
      <Button type="submit" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Card
      </Button>
    </React.Fragment>
  )
}

const StripeCardElementModal = ({ show, onClose, ...props }) => {
  const setupIntentId: any = useRef();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    async function createStripeSetupIntent() {
      let data: DataType | null = null;

      try {
        const res = await fetch("/api/stripe/create-setup-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        <StripeCard />
      )}
    </Modal>
  )
}

export default StripeCardElementModal;