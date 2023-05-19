import Form, { TextField } from "app/core/components/form";
import Typography from "app/core/components/shared/Typography";

import { AddChefDescription } from "../validations";

interface ProfileDescriptionType {
  description?: string;
}

function ProfileDescription(props: ProfileDescriptionType) {
  return (
    <>
      <Typography variant="body2">{props.description}</Typography>
      <Form schema={AddChefDescription} submitText="Finsh Onboarding">
        <TextField
          name="description"
          multiline
          minRows={4}
          helperText="60 Character limit"
        />
      </Form>
    </>
  );
}

export default ProfileDescription;
