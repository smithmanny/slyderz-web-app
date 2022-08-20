import { useMutation, useQuery } from "@blitzjs/rpc";
import PropTypes from 'prop-types'

import dishQuery from "../../queries/dishQuery"
import updateDishMutation from "../../mutations/updateDishMutation"

import Grid from 'app/core/components/shared/Grid'
import MenuLayout from './MenuLayout'
import DishForm from './DishForm'

import { SECTION } from './IndexContainer'

const UpdateDishContainer = (props) => {
  const { currentView, setCurrentView, setSelectedDishId, selectedDishId, selectedSection } = props;
  const [dish, { isLoading }] = useQuery(dishQuery, { dishId: selectedDishId, sectionId: selectedSection.id });
  const [updateDish] = useMutation(updateDishMutation)

  if (isLoading || !dish) {
    return 'Loading'
  }

  const initialValues = {
    description: dish.description,
    name: dish.name,
    price: dish.price,
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
          mutation={updateDish}
          submitText='Update Dish'
          sectionId={selectedSection.id}
          setCurrentView={setCurrentView}
          selectedDishId={selectedDishId}
        />
      </Grid>
    </MenuLayout>
  )
}

UpdateDishContainer.propTypes = {
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  setSelectedDishId: PropTypes.func.isRequired,
  selectedDishId: PropTypes.string.isRequired,
  selectedSection: PropTypes.string.isRequired,
}

export default UpdateDishContainer