import { FunctionComponent } from "react";
import { TextField as MuiTextField, TextFieldProps } from "mui-rff";

import Grid from "../shared/Grid";

interface TextProps extends TextFieldProps {
  xs?: number;
  md?: number;
}

const TextField: FunctionComponent<TextProps> = (props) => (
  <Grid item xs={props.xs || 12} md={props.md}>
    <MuiTextField {...props} />
  </Grid>
);

export default TextField;
