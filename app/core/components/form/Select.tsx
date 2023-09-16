import { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { Select as MuiSelect, SelectProps } from "mui-rff";
import { MenuItem } from "@mui/material";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Grid from "../shared/Grid";

interface MenuItemType {
  label: string;
  value: any;
}

interface SlyderzSelectProps extends SelectProps {
  items: Array<MenuItemType>;
  xs?: any;
  md?: any;
  name: string;
  label: string;
  required?: boolean;
  onChange?: (event) => void;
}

const Select: FunctionComponent<SlyderzSelectProps> = (props) => {
  const menuItems = props.items.map((item: MenuItemType, index: number) => {
    return (
      <MenuItem key={`${item.label}-${index}`} value={item.value}>
        {item.label}
      </MenuItem>
    );
  });
  return (
    <Grid item xs={props.xs || 12} md={props.md}>
      <MuiSelect
        {...props}
        label={props.label}
        name={props.name}
        required={props.required || false}
        // dateFunsUtils={DateFnsUtils}
      >
        {menuItems}
      </MuiSelect>
    </Grid>
  );
};

export default Select;
