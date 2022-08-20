import { useMutation } from "@blitzjs/rpc";

import Grid from 'app/core/components/shared/Grid'

import createDishMutation from "../../mutations/createDishMutation"

import MenuLayout from './MenuLayout'
import DishForm from './DishForm'

import { SECTION } from './IndexContainer'

const CreateDishContainer = (props) => {
  const { currentView, setCurrentView, selectedSection } = props;
  const [createDish] = useMutation(createDishMutation)
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView(SECTION)}
    >
      <Grid item xs={12}>
        <DishForm
          mutation={createDish}
          submitText='Create Dish'
          sectionId={selectedSection.id}
          setCurrentView={setCurrentView}
        />
      </Grid>
    </MenuLayout>
  )
}

export default CreateDishContainer