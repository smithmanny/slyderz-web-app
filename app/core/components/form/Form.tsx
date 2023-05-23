import { ReactNode, PropsWithoutRef } from "react";
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
} from "react-final-form";
import { FORM_ERROR } from "final-form";
import * as z from "zod";
import type { ZodError } from "zod";

import Button from "../shared/Button";
import Grid from "../shared/Grid";

type FormMutationType = {
  schema: Function;
  toVariables: (object) => void;
};

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
  function recursiveFormatZodErrors(errors: any) {
    let formattedErrors: Record<string, any> = {};

    for (const key in errors) {
      if (key === "_errors") {
        continue;
      }

      if (errors[key]?._errors?.[0]) {
        if (!isNaN(key as any) && !Array.isArray(formattedErrors)) {
          formattedErrors = [];
        }
        formattedErrors[key] = errors[key]._errors[0];
      } else {
        if (!isNaN(key as any) && !Array.isArray(formattedErrors)) {
          formattedErrors = [];
        }
        formattedErrors[key] = recursiveFormatZodErrors(errors[key]);
      }
    }

    return formattedErrors;
  }

  function formatZodError(error: ZodError) {
    if (!error || typeof error.format !== "function") {
      throw new Error(
        "The argument to formatZodError must be a zod error with error.format()"
      );
    }

    const errors = error.format();
    return recursiveFormatZodErrors(errors);
  }

  const validateZodSchemaAsync = (schema: any) => async (values: any) => {
    if (!schema) return {};
    try {
      await schema.parseAsync(values);
      return {};
    } catch (error: any) {
      return error.format ? formatZodError(error) : error.toString();
    }
  };

  async function _handleSubmit(values, formApi, cb) {
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
        } else {
          console.log("Error submitting form", error);
          return { [FORM_ERROR]: error.toString() };
        }
      }
    }

    if (typeof onSubmit === "function") {
      return onSubmit(values, formApi, cb);
    }
  }

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchemaAsync(schema)}
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

export default Form;
