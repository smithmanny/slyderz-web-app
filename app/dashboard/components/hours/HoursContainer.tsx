import React, { useState, useCallback } from 'react';
import { useMutation, useQuery } from "blitz"

import destroyHoursMutation from "app/dashboard/mutations/destroyHoursMutation"
import chefHoursQuery from "../../queries/hoursQuery"

import Card, { CardActions, CardContent } from "app/core/components/shared/Card"
import Box from "app/core/components/shared/Box"
import Grid from "app/core/components/shared/Grid"
import Stack from "app/core/components/shared/Stack"
import Typography from "app/core/components/shared/Typography"
import Button from "app/core/components/shared/Button"
import CreateHoursModal from './modal'

const HoursContainer = () => {
  const [showHoursModal, setShowHoursModal] = useState(false)
  const [destroyHours] = useMutation(destroyHoursMutation)
  const [chefHours, { refetch }] = useQuery(chefHoursQuery, {})

  const openHoursModal = useCallback(() => setShowHoursModal(true), [])
  const closeHoursModal = useCallback(() => setShowHoursModal(false), [])

  const destroyHourBlock = (hourBlockId: number) => {
    destroyHours({ id: hourBlockId }).then(() => refetch())
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} justifyContent="flex-end" sx={{ display: 'flex' }}>
          <Button onClick={openHoursModal}>Add Hours</Button>
        </Grid>

        {chefHours?.map(ch => (
          <Grid item xs={12} key={ch.id}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant='body2' sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Days of the week
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    {ch.daysOfWeek.map((day, index) => (
                      <Typography key={index} variant="body2">
                        {day}
                      </Typography>
                    ))}
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography variant='body2' sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                        Start Time: &nbsp;
                      </Typography>
                      <Typography>{ch.startTime}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Typography variant='body2' sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                        End Time: &nbsp;
                      </Typography>
                      <Typography>{ch.endTime}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  onClick={() => destroyHourBlock(ch.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreateHoursModal
        show={showHoursModal}
        refetch={refetch}
        onClose={closeHoursModal}
      />
    </React.Fragment>
  )
}

export default HoursContainer