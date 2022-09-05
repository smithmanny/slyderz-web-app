
import { EmailBodyType, EmailBodyResponseType } from 'types'

export function sendOrderRequestEmail(emailData: EmailBodyType) {
  const orderRequestData = {
    to: emailData.email,
    templateData: {
      acceptOrderUrl: emailData.acceptOrderUrl,
      chefEmail: emailData.chefEmail,
      denyOrderUrl: emailData.denyOrderUrl,
      cartItems: emailData.cartItems,
      eventDate: emailData.eventDate,
      eventTime: emailData.eventTime,
      location: '4288 Leola Rd, Douglasville, Ga, 30135',
      orderNumber: emailData.confirmationNumber,
      orderTotal: emailData.orderTotal,
    }
  };
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/mailers/send-order-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}

export function sendOrderResponseEmail(emailData: EmailBodyResponseType, response: Boolean) {
  const orderRequestData = {
    to: emailData.email,
    templateData: {
      cartItems: emailData.cartItems,
      chefEmail: emailData.chefEmail,
      orderNumber: emailData.orderNumber,
      eventDate: emailData.eventDate,
      eventTime: emailData.eventTime,
      location: '4288 Leola Rd, Douglasville, Ga, 30135',
      orderTotal: emailData.orderTotal,
    },
    response
  };
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/mailers/order-response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}