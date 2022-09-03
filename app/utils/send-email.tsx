
import { EmailBodyType, EmailBodyResponseType } from 'types'
import { siteUrl } from '../helpers/site'

export function sendOrderRequestEmail(emailData: EmailBodyType) {
  const orderRequestData = {
    to: 'shakhorsmith@gmail.com',
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
  return fetch(`${siteUrl}/api/mailers/send-order-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}

export function sendOrderResponseEmail(emailData: EmailBodyResponseType, response: Boolean) {
  const orderRequestData = {
    to: 'shakhorsmith@gmail.com',
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
  return fetch(`${siteUrl}/api/mailers/order-response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}