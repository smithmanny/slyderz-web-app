import { useEffect } from "react";
import { useRouter } from "blitz"

import IconButton from "app/core/components/shared/IconButton";
import DeleteIcon from 'app/core/components/icons/DeleteIcon'
import EditIcon from 'app/core/components/icons/EditIcon'
import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Stack from 'app/core/components/shared/Stack'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

const SectionContainer = (props) => {
  const { currentView, sections, setCurrentView, selectedSectionId } = props;
  const router = useRouter();
  const selectedSection = sections.find(section => section.id === selectedSectionId);
  const dishes = selectedSection.dishes

  useEffect(() => {
    if (selectedSectionId === null) {
      router.replace('/dashboard')
    }
  }, [selectedSectionId])
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView('HOME')}
      buttonFunc={() => setCurrentView('DISH')}
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
                    onClick={() => setCurrentView('DISH')}
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