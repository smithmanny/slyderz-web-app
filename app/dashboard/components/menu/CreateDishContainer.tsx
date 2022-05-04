import Grid from 'app/core/components/shared/Grid'

import MenuLayout from './MenuLayout'
import DishForm from './DishForm'

import { SECTION } from './IndexContainer'

const CreateDishContainer = (props) => {
  const { currentView, setCurrentView } = props;
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView(SECTION)}
    >
      <Grid item xs={12}>
        <DishForm />
      </Grid>
    </MenuLayout>
  )
}

export default CreateDishContainer