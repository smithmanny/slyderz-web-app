import { FunctionComponent } from "react";
import { Checkboxes } from "mui-rff";
import PropTypes from "prop-types";

import Grid from "../shared/Grid";

const Checkbox: FunctionComponent<any> = (props) => {
  const { label, data, name } = props;
  return (
    <Grid item xs={props.xs} md={props.md}>
      <Checkboxes
        label={label}
        name={name}
        data={data}
        formGroupProps={{
          row: true,
        }}
      />
    </Grid>
  );
};

Checkbox.defaultProps = {
  xs: 12,
  required: false,
};

Checkbox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  xs: PropTypes.number,
};

export default Checkbox;
