import React, { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "app/components/icons/ArrowBackIcon";
import Button from "app/components/shared/Button";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";

import { CREATE_DISH, HOME, SECTION, UPDATE_DISH } from "./IndexContainer";

type MenuLayoutProps = {
  currentView: string;
  buttonFunc?: () => void;
  goBackHome?: () => void;
  children: ReactNode;
  selectedSectionName?: string;
};
const MenuLayout = (props: MenuLayoutProps) => {
  const { currentView, buttonFunc, goBackHome, selectedSectionName } = props;
  let buttonTitle: string;
  let showActionButton = true;

  switch (currentView) {
    case HOME:
      buttonTitle = "Add Section";
      break;
    case SECTION:
      buttonTitle = "Add Dish";
      showActionButton = true;
      break;
    case CREATE_DISH:
      buttonTitle = "";
      showActionButton = false;
      break;
    case UPDATE_DISH:
      buttonTitle = "";
      showActionButton = false;
      break;
    default:
      buttonTitle = "Add Section";
  }

  return (
    <Grid container spacing={2}>
      {currentView !== "HOME" && (
        <Grid item xs={2}>
          <IconButton
            aria-label="back"
            disableRipple
            onClick={goBackHome}
            size="large"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Grid>
      )}
      {showActionButton && (
        <Grid
          item
          xs={currentView === "SECTION" ? 10 : 12}
          justifyContent="flex-end"
          sx={{ display: "flex" }}
        >
          <Button label="action-btn" onClick={buttonFunc}>
            {buttonTitle}
          </Button>
        </Grid>
      )}
      {currentView === SECTION && (
        <Grid item xs={12}>
          <Typography>Section: {selectedSectionName}</Typography>
        </Grid>
      )}
      <Grid item container xs={12} spacing={2}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default MenuLayout;
