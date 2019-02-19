import React from 'react';
import { Formik, Form } from 'formik';

export { default as DatePickerField } from './DatePickerGroup';
export { default as SelectField} from './SelectGroup';

const BasicForm = ({ children, initialValues }) => {
  return (
    <Formik initialValues={initialValues}>
      {({ values, errors }) => (
        <Form>
          {children({ values, errors })}
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;