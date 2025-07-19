import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../app/store';
import { uploadQuestionsCSV } from '../../app/slices/testSeriesSlice';

interface BulkUploadFormValues {
  testId: string;
  file: File | null;
}

const BulkUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [testItems] = useState<any[]>([]); // Replace `any` with your TestSeries type

  const defaultInitialValues: BulkUploadFormValues = {
    testId: '',
    file: null,
  };

  const validationSchema = Yup.object({
    // testId: Yup.string().required('Test series is required'),
    file: Yup.mixed<File>()
      .required('File is required')
      .test('fileFormat', 'Only CSV or Excel files allowed', (value) => {
        if (!value) return false;
        const allowedTypes = [
          'text/csv',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        return allowedTypes.includes(value.type);
      }),
  });

  const handleSubmit = async (
    values: BulkUploadFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (!values.file) return;

      const result = await dispatch(
        uploadQuestionsCSV({ testId: values.testId, file: values.file })
      );

      if (uploadQuestionsCSV.fulfilled.match(result)) {
        toast.success('Questions uploaded successfully!');
        resetForm();
      } else {
        toast.error('Upload failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📤 Bulk Upload Questions</h2>

      <Formik
        initialValues={defaultInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Select Test Series</label>
              <Field as="select" name="testId" className="w-full border border-gray-300 rounded p-2">
                <option value="">-- Choose Test --</option>
                {testItems.map((test) => (
                  <option key={test._id} value={test._id}>
                    {test.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="testId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-medium mb-1">Upload CSV or Excel File</label>
              <input
                type="file"
                name="file"
                accept=".csv,.xlsx"
                className="w-full border border-gray-300 rounded p-2"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] ?? null;
                  setFieldValue('file', file);
                }}
              />
              <ErrorMessage name="file" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Upload File
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BulkUpload;