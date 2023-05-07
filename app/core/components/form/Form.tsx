import { ReactNode, PropsWithoutRef } from "react";
import { AuthenticationError, validateZodSchema } from "blitz";
import PropTypes from "prop-types";
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
} from "react-final-form";
import { FORM_ERROR } from "final-form";
import * as z from "zod";
import { useSnackbar } from 'notistack'

import Button from "../shared/Button";
import Grid from "../shared/Grid";

type FormMutationType = {
  schema: any
  toVariables: (object) => void
}

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  onSubmit?: FinalFormProps<z.infer<S>>["onSubmit"];
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"];
  mutation?: FormMutationType;
  toVariables?: Function;
  onSuccess?: Function;
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues = {},
  mutation,
  toVariables,
  onSubmit,
  onSuccess,
  ...props
}: FormProps<S>) {
  const { enqueueSnackbar } = useSnackbar()
  async function _handleSubmit(values, formApi, cb) {
    console.log("FORM DIDN'T ON_SUBMIT RAN")
    if (mutation && mutation.toVariables) {
      const variables = mutation.toVariables(values);

      try {
        const data = await mutation.schema(variables);

        if (typeof onSuccess === "function") {
          return onSuccess(data);
        }
      } catch (error) {
        console.log(`Error submitting form ${JSON.stringify(error)}`);
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          return { email: "This email is already being used" };
        } else if (error instanceof AuthenticationError) {
          // return enqueueSnackbar("Sorry, those credentials are invalid", { variant: "error" })
          return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
        } else {
          return { [FORM_ERROR]: error.toString() };
        }
      }
    }
    console.log("FORM DIDN'T ON_SUBMIT RAN")
    if (typeof onSubmit === "function") {
      console.log("FORM ON_SUBMIT RAN")
      return onSubmit(values, formApi, cb);
    }
  };

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={_handleSubmit}
      render={({ handleSubmit, submitting, submitError, pristine }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          <Grid container spacing={2}>
            {children}

            {submitError && (
              <Grid item sx={{ color: "red" }}>
                {submitError}
              </Grid>
            )}

            {submitText && (
              <Grid item xs={12}>
                <Button
                  label="submit-text"
                  disabled={submitting || pristine}
                  type="submit"
                >
                  {submitText}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    />
  );
}

Form.defaultProps = {
  mutation: {},
  onSuccess: () => {},
};

Form.propTypes = {
  submitText: PropTypes.string,
  children: PropTypes.any.isRequired,
  mutation: PropTypes.shape({
    schema: PropTypes.any,
    toVariables: PropTypes.func,
  }),
  onSuccess: PropTypes.func,
};

export default Form;
