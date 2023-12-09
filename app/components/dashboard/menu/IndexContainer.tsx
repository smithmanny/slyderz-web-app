import React, { useState } from "react";
import dynamic from "next/dynamic";

import Container from "app/components/shared/Container";
import HomeContainer from "app/components/dashboard/menu/HomeContainer";

const DynamicSectionContainer = dynamic(
  () => import("app/components/dashboard/menu/SectionContainer"),
  { ssr: false },
);
const DynamicCreateDishContainer = dynamic(
  () => import("app/components/dashboard/menu/CreateDishContainer"),
  { ssr: false },
);
const DynamicUpdateDishContainer = dynamic(
  () => import("app/components/dashboard/menu/UpdateDishContainer"),
  { ssr: false },
);

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
      MenuView = DynamicSectionContainer;
      break;
    case CREATE_DISH:
      MenuView = DynamicCreateDishContainer;
      break;
    case UPDATE_DISH:
      MenuView = DynamicUpdateDishContainer;
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
