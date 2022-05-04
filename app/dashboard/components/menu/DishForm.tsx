import InputAdornment from '@mui/material/InputAdornment';

import Form, { TextField } from "app/core/components/form"

const DishForm = (props) => {
  const initialValues = props.initialValues ? props.initialValues : {}
  return (
    <Form
      submitText="Create Dish"
      // schema={Login}
      initialValues={initialValues}
      mutation={{
        // schema: login,
        toVariables: values => ({
          ...values
        })
      }}
    >
      <TextField
        name="name"
        label="Dish Name"
        placeholder="Air-Fried Chipotle Wings"
      />
      <TextField
        name="description"
        label="Dish Description"
        placeholder="Hand breaded wings Air-Fried and dipped in chipotle sauce"
        multiline
        minRows={3}
      />
      <TextField
        name="price"
        label="Dish Price"
        placeholder="22.00"
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
      />
    </Form>
  )
}

export default DishForm