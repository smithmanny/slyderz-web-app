import { useQuery } from "blitz"
import IconButton from "@mui/material/IconButton";

import menuSectionsQuery from "../../queries/menuSectionsQuery"

import DeleteIcon from 'app/core/components/icons/DeleteIcon'
import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Stack from 'app/core/components/shared/Stack'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

import { SECTION } from './IndexContainer'

const HomeContainer = (props) => {
  const { currentView, setCurrentView, setSelectedSection } = props;
  const [sections] = useQuery(menuSectionsQuery, {})

  return (
    <MenuLayout
      currentView={currentView}
    >
      {sections?.map(section => (
        <Grid item xs={12} key={section.id}>
          <Card onClick={() => {
            setCurrentView(SECTION)
            setSelectedSection(section)
          }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography>{section.name}</Typography>
                </Box>

                <Stack direction="row">
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

export default HomeContainer