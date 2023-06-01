import { trpc } from "server/utils/trpc";

import Grid from "app/core/components/shared/Grid";
import MenuLayout from "./MenuLayout";
import DishForm from "./DishForm";

import { SECTION } from "./IndexContainer";

type UpdateDishContainerProps = {
  currentView: string;
  setCurrentView: (string) => void;
  setSelectedDishId: (string) => void;
  selectedDishId: string;
  selectedSection: {
    id: string;
  };
};

const UpdateDishContainer = (props: UpdateDishContainerProps) => {
  const {
    currentView,
    setCurrentView,
    setSelectedDishId,
    selectedDishId,
    selectedSection,
  } = props;

  const { data, isLoading } = trpc.dashboard.getChefSectionDish.useQuery({
    dishId: selectedDishId,
    sectionId: selectedSection.id,
  });
  const updateDish = trpc.dashboard.updateDish.useMutation();

  if (isLoading || !data) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  const initialValues = {
    description: data.description,
    name: data.name,
    price: data.price,
    selectedDishId,
  };

  const goBackFunc = () => {
    setCurrentView(SECTION);
    setSelectedDishId(null);
  };
  return (
    <MenuLayout currentView={currentView} goBackHome={goBackFunc}>
      <Grid item xs={12}>
        <DishForm
          initialValues={initialValues}
          mutation={updateDish.mutateAsync}
          submitText="Update Dish"
          sectionId={selectedSection.id}
          setCurrentView={setCurrentView}
        />
      </Grid>
    </MenuLayout>
  );
};

export default UpdateDishContainer;
