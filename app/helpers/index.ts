
import { EmailBodyType } from 'types'

export const formatNumberToCurrency = (number: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(number)
}

// Render times for chef hours
interface TimeType {
  key: string,
  value: string | null
}

const renderHours = (tod = 'AM') => {
  const hours = 12
  const times: Array<TimeType> = []

    for (let x = 1; x <= hours; x++) {
      for (let y = 0; y < 60; y += 30) {
        const date = new Date()
        let time = `${x}:${y} ${tod}`

        if (y === 0) {
          time = `${x}:${y}0 ${tod}`
        }

        const data = {
          key: time,
          value: time
        }

        times.push(data)
      }
    }

  return times
}
export const todAM = renderHours()
export const todPM = renderHours('PM')

export const weekdays = [
  {
    label: 'Sunday',
    value: 'SUNDAY'
  },
  {
    label: 'Monday',
    value: 'MONDAY'
  },
  {
    label: 'Tuesday',
    value: 'TUESDAY'
  },
  {
    label: 'Wednesday',
    value: 'WEDNESDAY'
  },
  {
    label: 'Thursday',
    value: 'THURSDAY'
  },
  {
    label: 'Friday',
    value: 'FRIDAY'
  },
  {
    label: 'Saturday',
    value: 'SATURDAY'
  },
]

export const convertDayToInt = (day: string) => {
  const daysOfWeek = {
    'SUNDAY': 0,
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6,
  }

  return daysOfWeek[day]
}

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
  return fetch("http://localhost:3000/api/mailers/send-order-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderRequestData)
  });
}