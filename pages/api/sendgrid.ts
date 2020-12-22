export default async (req, res) => {
  const body = {
    list_ids: ["142eafaf-b882-404f-9c5e-041177e30e5e"],
    contacts: [
      {
        email: req.body,
      },
    ],
  };
  const options = {
    method: "PUT",
    headers: {
      authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const sendgrid = await fetch(
    "https://api.sendgrid.com/v3/marketing/contacts",
    options
  );
  const data = await sendgrid.json();
  res.send(data);
};
