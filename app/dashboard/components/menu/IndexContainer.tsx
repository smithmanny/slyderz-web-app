import React, { useState } from "react";

import Container from "app/core/components/shared/Container";
import HomeContainer from "app/dashboard/components/menu/HomeContainer";
import SectionContainer from "app/dashboard/components/menu/SectionContainer";
import CreateDishContainer from "app/dashboard/components/menu/CreateDishContainer";
import UpdateDishContainer from "app/dashboard/components/menu/UpdateDishContainer";

export const HOME = "HOME";
export const SECTION = "SECTION";
export const CREATE_DISH = "CREATE_DISH";
export const UPDATE_DISH = "UPDATE_DISH";

const IndexContainer = () => {
  const [currentView, setCurrentView] = useState(HOME);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedDishId, setSelectedDishId] = useState(null);
  let MenuView;

  switch (currentView) {
    case HOME:
      MenuView = HomeContainer;
      break;
    case SECTION:
      MenuView = SectionContainer;
      break;
    case CREATE_DISH:
      MenuView = CreateDishContainer;
      break;
    case UPDATE_DISH:
      MenuView = UpdateDishContainer;
      break;
    default:
      MenuView = HomeContainer;
      break;
  }

  return (
    <Container>
      <MenuView
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedDishId={selectedDishId}
        setSelectedDishId={setSelectedDishId}
      />
    </Container>
  );
};

export default IndexContainer;
