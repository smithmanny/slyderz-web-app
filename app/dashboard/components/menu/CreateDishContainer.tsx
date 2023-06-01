import { trpc } from "server/utils/trpc";

import Grid from "app/core/components/shared/Grid";
import MenuLayout from "./MenuLayout";
import DishForm from "./DishForm";

import { SECTION } from "./IndexContainer";

const CreateDishContainer = (props) => {
  const { currentView, setCurrentView, selectedSection } = props;
  const createDish = trpc.dashboard.createDish.useMutation();
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView(SECTION)}
    >
      <Grid item xs={12}>
        <DishForm
          mutation={createDish.mutateAsync}
          submitText="Create Dish"
          sectionId={selectedSection.id}
          setCurrentView={setCurrentView}
        />
      </Grid>
    </MenuLayout>
  );
};

export default CreateDishContainer;
