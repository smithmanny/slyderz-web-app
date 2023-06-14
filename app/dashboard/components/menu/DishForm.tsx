import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import { useSnackbar } from "notistack";

import { formatNumberToCurrency } from "app/utils/time";
import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/core/components/form";
import Grid from "app/core/components/shared/Grid";
import UploadImage from "app/core/components/shared/UploadImage";

type DishImageType = {
  imageUrl: string;
  imagePublicId: string;
};

type DishFormPropTypes = {
  initialValues?: object;
  submitText: string;
  sectionId: string;
  selectedDishId?: string;
  mutation: (...args) => Promise<any>;
  dishImage?: DishImageType;
};

const DishForm = (props: DishFormPropTypes) => {
  const initialValues = props.initialValues;
  const { enqueueSnackbar } = useSnackbar();
  const [dishImage, setDishImage] = useState<DishImageType | null>(null);

  const destroyImage = trpc.dashboard.destroyDishPicture.useMutation({
    onSuccess: () => {
      setDishImage(null);
    },
    onError: (err) => {
      console.log(err);
      enqueueSnackbar("Image not deleted. Please try again", {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    if (props.dishImage) {
      setDishImage(props.dishImage);
    }
  }, [props.dishImage]);

  const deleteDishImage = async () => {
    setDishImage(null);
  };

  return (
    <Form
      submitText={props.submitText}
      initialValues={initialValues}
      mutation={{
        schema: props.mutation,
        toVariables: (values) => ({
          ...values,
          price: String(formatNumberToCurrency(values.price).replace("$", "")),
          sectionId: props.sectionId,
          image: dishImage,
        }),
      }}
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <Grid item xs={12}>
        <UploadImage
          uploadPreset="dish_image"
          image={dishImage}
          destroyFunc={destroyImage}
          destroyOnSuccess={deleteDishImage}
          onUpload={async (res) => {
            setDishImage({
              imageUrl: res.info.secure_url,
              imagePublicId: res.info.public_id,
            });
          }}
          imageOptions={{
            minImageHeight: 1200,
            minImageWidth: 675,
          }}
          previewOptions={{
            alt: "dish preview image",
          }}
          fullWidth
        />
      </Grid>
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
  submitText: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  selectedDishId: PropTypes.number,
  mutation: PropTypes.any.isRequired,
};

export default DishForm;
