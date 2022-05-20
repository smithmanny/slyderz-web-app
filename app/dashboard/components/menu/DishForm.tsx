import PropTypes from 'prop-types'
import InputAdornment from '@mui/material/InputAdornment';

import Form, { TextField } from "app/core/components/form"
import { formatNumberToCurrency } from 'app/helpers'

const DishForm = (props) => {
  const initialValues = props.initialValues

  if (props.selectedDishId) {
    initialValues['selectedDishId'] = props.selectedDishId;
  }

  return (
    <Form
      submitText={props.submitText}
      // schema={Login}
      initialValues={initialValues}
      mutation={{
        schema: props.mutation,
        toVariables: values => ({
          ...values,
          price: formatNumberToCurrency(values.price).replace('$', ''),
          sectionId: props.sectionId,
        }),
      }}
      onSuccess={() => props.setCurrentView('SECTION')}
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

DishForm.defaultProps = {
  initialValues: {},
  selectedDishId: null,
}

DishForm.propTypes = {
  initialValues: PropTypes.object,
  setCurrentView: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  selectedDishId: PropTypes.number,
  mutation: PropTypes.any.isRequired
}

export default DishForm