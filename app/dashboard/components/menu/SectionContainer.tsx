import { useQuery } from "blitz"

import menuSectionQuery from "../../queries/menuSectionQuery"

import IconButton from "app/core/components/shared/IconButton";
import DeleteIcon from 'app/core/components/icons/DeleteIcon'
import EditIcon from 'app/core/components/icons/EditIcon'
import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Stack from 'app/core/components/shared/Stack'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

import { CREATE_DISH, HOME, UPDATE_DISH } from './IndexContainer'

const SectionContainer = (props) => {
  const { currentView, setCurrentView, selectedSection, setSelectedDishId } = props;
  const [dishes] = useQuery(menuSectionQuery, { sectionId: selectedSection.id });

  const handleEditOnClick = (dishId) => {
    setSelectedDishId(dishId)
    setCurrentView(UPDATE_DISH)
  }

  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView(HOME)}
      buttonFunc={() => setCurrentView(CREATE_DISH)}
      selectedSectionName={selectedSection.name}
    >
      {dishes?.map(dish => (
        <Grid item xs={12} key={dish.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography>{dish.name}</Typography>
                  <Typography>${dish.price}</Typography>
                </Box>

                <Stack direction="row">
                  <IconButton
                    aria-label="edit"
                    disableRipple
                    onClick={() => handleEditOnClick(dish.id)}
                    size="large">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    disableRipple
                    // onClick={goBackHome}
                    size="large">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>

              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </MenuLayout>
  )
}

export default SectionContainer