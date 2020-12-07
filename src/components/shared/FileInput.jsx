import React from 'react';
import { useFormik } from 'formik';

const FileInput = (props) => {
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: ({ file }) => {
      props.onSubmit(file);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="file" name="file" id="file"
        onChange={(event) => {
          formik.setFieldValue('file', event.currentTarget.files[0]);
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default FileInput;
