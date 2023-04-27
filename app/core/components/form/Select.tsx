import { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { Select as MuiSelect } from "mui-rff";
import { MenuItem } from "@mui/material";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Grid from "../shared/Grid";

interface MenuItemType {
  key: string;
  value: string;
}

const Select: FunctionComponent<any> = (props) => {
  const menuItems = props.items.map((item: MenuItemType, index: number) => {
    return (
      <MenuItem key={item.key} value={item.value}>
        {item.key}
      </MenuItem>
    );
  });
  return (
    <Grid item xs={props.xs} md={props.md}>
      <MuiSelect
        label={props.label}
        name={props.name}
        required={props.required}
        dateFunsUtils={DateFnsUtils}
        {...props}
      >
        {menuItems}
      </MuiSelect>
    </Grid>
  );
};

Select.defaultProps = {
  name: "",
  xs: 12,
  required: false,
};

Select.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  xs: PropTypes.number,
};

export default Select;
