import InputAdornment from '@mui/material/InputAdornment';

import Form, { TextField } from "app/core/components/form"
import DeleteIcon from 'app/core/components/icons/DeleteIcon'
import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Stack from 'app/core/components/shared/Stack'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

const HomeContainer = (props) => {
  const { currentView, setCurrentView } = props;
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView('SECTION')}
    >
      <Grid item xs={12}>
        <Form
          submitText="Create Dish"
          // schema={Login}
          // initialValues={initialValues}
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
      </Grid>
    </MenuLayout>
  )
}

export default HomeContainer