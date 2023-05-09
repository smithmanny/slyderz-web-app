import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";

import { formatNumberToCurrency } from "app/utils/time";

import Form, { TextField } from "app/core/components/form";
import Grid from "app/core/components/shared/Grid";
import { CldUploadWidget } from "next-cloudinary";
import IconButton from "app/core/components/shared/IconButton";
import AddAPhotoSharpIcon from "@mui/icons-material/AddAPhotoSharp";

const DishForm = (props) => {
  const initialValues = props.initialValues;

  return (
    <Form
      submitText={props.submitText}
      // schema={Login}
      initialValues={initialValues}
      mutation={{
        schema: props.mutation,
        toVariables: (values) => ({
          ...values,
          price: String(formatNumberToCurrency(values.price).replace("$", "")),
          sectionId: props.sectionId,
        }),
      }}
      onSuccess={() => props.setCurrentView("SECTION")}
    >
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset="chef_profile_pic"
        onUpload={(error, result, widget) => {
          if (error) {
            console.log("ERROR UPLOADING IMAGE", error);
          }
          console.log("UPLOADED", result);
          // setResource(result?.info); // Updating local state with asset details
          widget.close(); // Close widget immediately after successful upload
        }}
        options={{
          cropping: true,
          croppingCoordinatesMode: "face",
          minImageHeight: 250,
          minImageWidth: 250,
          sources: ["local"],
          resourceType: "image",
          clientAllowedFormats: ["webp", "jpg", "jpeg", "png"],
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Grid item>
              <IconButton
                onClick={handleOnClick}
                size="large"
                aria-label="add icon"
              >
                <AddAPhotoSharpIcon />
              </IconButton>
            </Grid>
          );
        }}
      </CldUploadWidget>
      <TextField
        name="name"
        label="Dish Name"
        placeholder="Air-Fried Chipotle Wings"
      />
      <TextField
        name="description"
        label="Dish Description"
        placeholder="Hand breaded wings Air-Fried and dipped in chipotle sauce"
        multiline
        minRows={3}
      />
      <TextField
        name="price"
        label="Dish Price"
        placeholder="22.00"
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Form>
  );
};

DishForm.defaultProps = {
  initialValues: {},
  selectedDishId: null,
};

DishForm.propTypes = {
  initialValues: PropTypes.object,
  setCurrentView: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  selectedDishId: PropTypes.number,
  mutation: PropTypes.any.isRequired,
};

export default DishForm;
