import React, { useState } from 'react'
import { useQuery } from "blitz"

import ChefMenuSectionsQuery from "../../queries/chefMenuSectionsQuery"

import Container from "app/core/components/shared/Container"
import HomeContainer from 'app/dashboard/components/menu/HomeContainer'
import SectionContainer from 'app/dashboard/components/menu/SectionContainer'
import DishContainer from 'app/dashboard/components/menu/DishContainer'

const HOME = 'HOME'
const SECTION = 'SECTION'
const DISH = 'DISH'

const IndexContainer = () => {
  const [currentView, setCurrentView] = useState(HOME)
  const [selectedSectionId, setSelectedSectionId] = useState()
  const [sections] = useQuery(ChefMenuSectionsQuery, {})
  let MenuView

  switch (currentView) {
    case HOME:
      MenuView = HomeContainer
      break;
    case SECTION:
      MenuView = SectionContainer
      break;
    case DISH:
      MenuView = DishContainer
      break;
    default:
      MenuView = HomeContainer
      break;
  }

  return (
    <Container>
      <MenuView
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedSectionId={selectedSectionId}
        setSelectedSectionId={setSelectedSectionId}
        sections={sections}
      />
    </Container>
  )
}

export default IndexContainer