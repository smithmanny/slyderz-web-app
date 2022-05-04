import { useQuery } from "blitz"

import dishQuery from "../../queries/dishQuery"

import Grid from 'app/core/components/shared/Grid'
import MenuLayout from './MenuLayout'
import DishForm from './DishForm'

import { SECTION } from './IndexContainer'

const UpdateDishContainer = (props) => {
  const { currentView, setCurrentView, setSelectedDishId, selectedDishId, selectedSection } = props;
  const [dish] = useQuery(dishQuery, { dishId: selectedDishId, sectionId: selectedSection.id });
  const initialValues = {
    description: dish?.description,
    name: dish?.name,
    price: dish?.price,
  }

  const goBackFunc = () => {
    setCurrentView(SECTION)
    setSelectedDishId(null)
  }
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={goBackFunc}
    >
      <Grid item xs={12}>
        <DishForm
          initialValues={initialValues}
        />
      </Grid>
    </MenuLayout>
  )
}

export default UpdateDishContainer