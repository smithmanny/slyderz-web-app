import React from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form'
import { useApolloClient } from '@apollo/react-hooks';

export { default as DatePickerField } from './DatePickerGroup';
export { default as TimePickerField } from './TimePickerGroup';
export { default as TextField } from './TextFieldGroup';
export { default as Select } from '@material-ui/core/Select';

const BasicForm = ({ children, defaultValues, refetchQueries, mutate, ...props }) => {
  const methods = useForm({ defaultValues, validationSchema: (mutate && mutate.validation) ? mutate.validation : null });
  const { handleSubmit, reset } = methods
  
  function handleFormSubmit(values) {
    const { toVariables, onCompleted, onSubmit, mutation } = mutate;
    const variables = toVariables(values);
    
    // Call custom submit function instead of GraphQL mutation
    if (typeof onSubmit === 'function') {
      return onSubmit(variables);
    }
    // Handle form request with GraphQL
    const client = useApolloClient();
    return client
      .mutate({
        mutation,
        variables,
        refetchQueries
      })
      .then(res => {
        reset();
        if (typeof onCompleted === 'function') {
          onCompleted(res.data);
        }
      })
      .catch(err => {
        const errorMessage = err.message.replace('GraphQL error: ', '')
        console.warn(errorMessage)
      });
  }
  return (
    <FormContext {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        {...props}
      >
        {Array.isArray(children)
          ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name
                }
              })
              : child;
          })
          : children}
      </form>
    </FormContext>
  );
};

BasicForm.defaultProps = {
  refetchQueries: []
};

BasicForm.propTypes = {
  children: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  mutate: PropTypes.shape({
    mutation: PropTypes.object,
    onCompleted: PropTypes.func,
    onSubmit: PropTypes.func,
    toVariables: PropTypes.func,
    validation: PropTypes.object
  }),
  refetchQueries: PropTypes.arrayOf(PropTypes.string)
};

export default BasicForm;
