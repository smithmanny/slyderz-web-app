import React, { useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";

import { trpc } from "server/utils/trpc";

import DeleteIcon from "app/core/components/icons/DeleteIcon";
import Card, { CardContent } from "app/core/components/shared/Card";
import Box from "app/core/components/shared/Box";
import Grid from "app/core/components/shared/Grid";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";
import MenuLayout from "app/dashboard/components/menu/MenuLayout";

import { SECTION } from "./IndexContainer";

const CreateSectionModal = dynamic(
  () => import("app/core/modals/dashboard/createSectionModal"),
  {
    ssr: false,
  }
);

const HomeContainer = (props) => {
  const { currentView, setCurrentView, setSelectedSection } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [showSectionModal, setShowSectionModal] = useState(false);
  const { data, refetch } = trpc.dashboard.getMenuSections.useQuery();
  const destroySection = trpc.dashboard.destroySection.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Section deleted", { variant: "success" });
      refetch();
    },
  });
  const sections = data || [];

  const closeSectionModal = useCallback(() => {
    setShowSectionModal(false);
  }, []);

  const openSectionModal = useCallback(() => {
    setShowSectionModal(true);
  }, []);

  return (
    <React.Fragment>
      <MenuLayout currentView={currentView} buttonFunc={openSectionModal}>
        <Grid item xs={12}>
          <Typography variant="h6">Your Sections</Typography>
        </Grid>
        {sections.map((section) => (
          <Grid item xs={12} key={section.id}>
            <Card
              onClick={() => {
                setCurrentView(SECTION);
                setSelectedSection(section);
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography>{section.name}</Typography>
                  </Box>

                  <Stack direction="row">
                    <IconButton
                      aria-label="delete"
                      disableRipple
                      onClick={async (e) => {
                        e.stopPropagation();
                        return destroySection.mutateAsync({
                          sectionId: section.id,
                        });
                      }}
                      size="large"
                    >
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
        onClose={closeSectionModal}
        refetch={refetch}
      />
    </React.Fragment>
  );
};

export default HomeContainer;
