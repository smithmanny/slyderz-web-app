export const siteUrl = process.env.VERCEL_URL || "http://localhost:3000"

function setStripeKey() {
  if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY === undefined || null) {
    return 'sk_test_PHGdRXFISHoYwFqSlVPfTEh7'
  }

  return process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
}
export const STRIPE_SECRET = setStripeKey();