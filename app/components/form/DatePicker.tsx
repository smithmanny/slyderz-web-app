import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { DatePicker as MuiDatePicker } from "mui-rff";
import "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Grid from "../shared/Grid";

const DatePicker: FunctionComponent<any> = (props) => {
  return (
    <Grid item xs={props.xs || 12} md={props.md}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          label={props.label}
          name={props.name}
          required={props.required}
          desktopModeMediaQuery="@media (min-width: 2000px)"
          closeOnSelect
          sx={{
            width: "100%",
          }}
          {...props}
        />
      </LocalizationProvider>
    </Grid>
  );
};

DatePicker.defaultProps = {
  label: "",
  name: "",
  xs: 12,
  required: false,
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default DatePicker;
