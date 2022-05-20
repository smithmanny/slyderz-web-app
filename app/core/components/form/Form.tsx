import { ReactNode, PropsWithoutRef } from "react"
import PropTypes from 'prop-types'
import { AuthenticationError, validateZodSchema } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { FORM_ERROR } from "final-form"
import * as z from "zod"

import Button from '../shared/Button'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit?: FinalFormProps<z.infer<S>>["onSubmit"],
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  mutation?: any,
  toVariables?: Function,
  onSuccess?: Function,
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  mutation,
  toVariables,
  onSubmit,
  onSuccess,
  ...props
}: FormProps<S>) {
  const _handleSubmit = (values, formApi, cb) => {
    async function handleMutation(variables) {
      try {
        await mutation.schema(variables)

        if (typeof onSuccess === 'function') {
          return onSuccess();
        }
      } catch (error) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          return { email: "This email is already being used" }
        } else if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
        } else {
          return { [FORM_ERROR]: error.toString() }
        }
      }
    }

    if (mutation) {
      const variables = mutation.toVariables(values);
      return handleMutation(variables)
    }

    if (onSubmit) {
      return onSubmit(values, formApi, cb)
    }
  }
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={_handleSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <Button type="submit" disabled={submitting}>
              {submitText}
            </Button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

Form.defaultProps = {
  mutation: {},
  onSuccess: () => {}
}

Form.propTypes = {
  submitText: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  mutation: PropTypes.shape({
    schema: PropTypes.any,
    toVariables: PropTypes.func
  }),
  onSuccess: PropTypes.func,
}

export default Form
