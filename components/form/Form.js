import React from 'react';
import { Formik, Form } from 'formik';

import DatePickerGroup from './DatePickerGroup';
import SelectGroup from './SelectGroup';

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

BasicForm.DatePickerField = DatePickerGroup
BasicForm.SelectField = SelectGroup

export default BasicForm;