import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";

import { trpc } from "server/utils/trpc";

import Card, {
  CardActions,
  CardContent,
} from "app/core/components/shared/Card";
import Box from "app/core/components/shared/Box";
import Grid from "app/core/components/shared/Grid";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";
import Button from "app/core/components/shared/Button";

const DynamicCreateHoursModal = dynamic(() => import("./modal/hoursModal"));

const HoursContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showHoursModal, setShowHoursModal] = useState(false);
  const destroyHours = trpc.dashboard.destroyHours.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Hours deleted", { variant: "success" });
      refetch();
    },
    onError: (err) => {
      enqueueSnackbar("Hours not deleted", { variant: "error" });
    },
  });
  const { data, refetch } = trpc.dashboard.getChefHours.useQuery();
  const chefHours: any = data || [];

  const openHoursModal = useCallback(() => setShowHoursModal(true), []);
  const closeHoursModal = useCallback(() => setShowHoursModal(false), []);

  const destroyHourBlock = (hourBlockId: string) => {
    return destroyHours.mutateAsync({ hourId: hourBlockId });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} justifyContent="flex-end" sx={{ display: "flex" }}>
          <Button label="add-hours" onClick={openHoursModal}>
            Add Hours
          </Button>
        </Grid>

        {chefHours?.map((ch) => (
          <Grid item xs={12} key={ch.id}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    Days of the week
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    {ch.daysOfWeek.map((dow, index) => (
                      <Typography key={index} variant="body2">
                        {dow}
                      </Typography>
                    ))}
                  </Stack>

                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                      >
                        Start Time: &nbsp;
                      </Typography>
                      <Typography>{ch.startTime}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                      >
                        End Time: &nbsp;
                      </Typography>
                      <Typography>{ch.endTime}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  label="delete"
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
      <DynamicCreateHoursModal
        show={showHoursModal}
        refetch={refetch}
        onClose={closeHoursModal}
      />
    </React.Fragment>
  );
};

export default HoursContainer;
