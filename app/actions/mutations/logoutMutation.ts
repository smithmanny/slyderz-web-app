export default async function logoutMutation() {
  return fetch('http://localhost:3000/api/logout', {
    method: 'POST'
  })
}