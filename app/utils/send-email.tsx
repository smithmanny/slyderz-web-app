
import { EmailBodyType, EmailBodyResponseType } from 'types'

export function sendOrderRequestEmail(emailData: EmailBodyType) {
  let url = "localhost:3000/api/mailers/send-order-request"
  if (process.env.NEXT_PUBLIC_URL) {
    url = `${process.env.NEXT_PUBLIC_URL}/api/mailers/send-order-request`
  }

  console.log({ url })

  const orderRequestData = {
    to: emailData.email,
    templateData: {
      acceptOrderUrl: emailData.acceptOrderUrl,
      denyOrderUrl: emailData.denyOrderUrl,
      cartItems: emailData.cartItems,
      eventDate: emailData.eventDate,
      eventTime: emailData.eventTime,
      location: '4288 Leola Rd, Douglasville, Ga, 30135',
      orderNumber: emailData.confirmationNumber,
      orderTotal: emailData.orderTotal,
    }
  };
  return fetch("https://slyderz-web-app-staging.up.railway.app/api/mailers/send-order-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}

export function sendOrderResponseEmail(emailData: EmailBodyResponseType, response: Boolean) {
  let url = "localhost:3000/api/mailers/send-order-request"
  if (process.env.NEXT_PUBLIC_URL) {
    url = `${process.env.NEXT_PUBLIC_URL}/api/mailers/send-order-request`
  }

  const orderRequestData = {
    to: emailData.email,
    templateData: {
      cartItems: emailData.cartItems,
      orderNumber: emailData.orderNumber,
      eventDate: emailData.eventDate,
      eventTime: emailData.eventTime,
      location: '4288 Leola Rd, Douglasville, Ga, 30135',
      orderTotal: emailData.orderTotal,
    },
    response
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}