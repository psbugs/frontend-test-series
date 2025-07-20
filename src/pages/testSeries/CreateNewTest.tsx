import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTestSeries, updateTestSeries } from '../../app/slices/testSeriesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {toast} from 'react-toastify';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  audience: Yup.string().oneOf(['course', 'skill', 'public']).required('Audience is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required'),
  timeLimit: Yup.number().min(1, 'Min 1 minute').required('Time limit is required'),
  visibility: Yup.string().oneOf(['public', 'courseOnly']).required('Visibility is required'),
  skillTag: Yup.string().required('Skill Tag is required'),
});

const defaultValues = {
  title: '',
  audience: 'course',
  startDate: '',
  endDate: '',
  timeLimit: 30,
  visibility: 'public',
  skillTag: '',
};

const CreateNewTest = ({
  onClose,
  initialData,
  isEditing,
}: {
  onClose: () => void;
  initialData?: any;
  isEditing?: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = initialData
    ? {
        title: initialData.title || '',
        audience: initialData.audience || 'course',
        startDate: initialData.startDate?.slice(0, 16) || '',
        endDate: initialData.endDate?.slice(0, 16) || '',
        timeLimit: initialData.timeLimit || 30,
        visibility: initialData.visibility || 'public',
        skillTag: initialData.skillTag || '',
      }
    : defaultValues;


const handleSubmit = async (values: any) => {
  try {
    if (isEditing && initialData?._id) {
      await dispatch(updateTestSeries({ id: initialData._id, payload: values })).unwrap();
      toast.success('Test updated successfully');
      onClose(); // Close modal on success

    } else {
      await dispatch(createTestSeries(values)).unwrap();
      toast.success('Test created successfully');
    }
  } catch (error) {
    console.error('Error while submitting test:', error);
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">
        {isEditing ? '✏️ Edit Test Series' : '➕ Create New Test Series'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-5">
            {/* Test Title */}
            <div>
              <label className="block text-sm font-medium">Test Title</label>
              <Field name="title" className="w-full mt-1 p-2 border rounded" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Audience */}
            <div>
              <label className="block text-sm font-medium">Target Audience</label>
              <div className="flex gap-4 mt-1">
                {['course', 'skill', 'public'].map((aud) => (
                  <label key={aud} className="flex items-center gap-1">
                    <Field type="radio" name="audience" value={aud} />
                    {aud.charAt(0).toUpperCase() + aud.slice(1)}
                  </label>
                ))}
              </div>
              <ErrorMessage name="audience" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Attempt Window */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Start Date & Time</label>
                <Field name="startDate" type="datetime-local" className="w-full mt-1 p-2 border rounded" />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">End Date & Time</label>
                <Field name="endDate" type="datetime-local" className="w-full mt-1 p-2 border rounded" />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label className="block text-sm font-medium">Time Limit (in minutes)</label>
              <Field name="timeLimit" type="number" className="w-full mt-1 p-2 border rounded" />
              <ErrorMessage name="timeLimit" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium">Visibility</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <Field type="radio" name="visibility" value="public" />
                  Public
                </label>
                <label className="flex items-center gap-1">
                  <Field type="radio" name="visibility" value="courseOnly" />
                  Course Only
                </label>
              </div>
              <ErrorMessage name="visibility" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Skill Tag */}
            <div>
              <label className="block text-sm font-medium">Skill Tag</label>
              <Field name="skillTag" placeholder="e.g. Advanced JavaScript" className="w-full mt-1 p-2 border rounded" />
              <ErrorMessage name="skillTag" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {isEditing ? 'Update Test Series' : 'Create Test Series'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateNewTest;
