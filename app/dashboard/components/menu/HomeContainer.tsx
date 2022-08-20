import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc";
import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";

import menuSectionsQuery from "../../queries/menuSectionsQuery"
import createSectionMutation from "../../mutations/createSectionMutation"
import destroySectionMutation from "../../mutations/destroySectionMutation"

import DeleteIcon from 'app/core/components/icons/DeleteIcon'
import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Stack from 'app/core/components/shared/Stack'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

import { SECTION } from './IndexContainer'
import CreateSectionModal from 'app/core/modals/dashboard/createSectionModal'

const HomeContainer = (props) => {
  const { currentView, setCurrentView, setSelectedSection } = props;
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [sections, { refetch }] = useQuery(menuSectionsQuery, {})
  const [createSection] = useMutation(createSectionMutation)
  const [destroySection] = useMutation(destroySectionMutation)

  const closeSectionModal = () => {
    setShowSectionModal(false)
  }

  const openSectionModal = () => {
    setShowSectionModal(true)
  }

  const refetchSections = () => {
    return invalidateQuery(menuSectionsQuery)
  }

  return (
    <React.Fragment>
      <MenuLayout
        currentView={currentView}
        buttonFunc={openSectionModal}
      >
        <Grid item xs={12}>
          <Typography variant='h6'>Your Sections</Typography>
        </Grid>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        destroySection({ id: section.id }, { onSuccess: () => refetch() })
                      }}
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
      <CreateSectionModal
        show={showSectionModal}
        createSection={createSection}
        onClose={closeSectionModal}
        refetch={refetch}
      />
    </React.Fragment>
  )
}

export default HomeContainer