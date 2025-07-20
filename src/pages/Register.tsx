import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from '../app/store';
import { registerUser } from '../app/slices/usersSlice';
import { Loader } from 'lucide-react';
import Header from '../components/Header';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm your password'),
  role: Yup.string()
    .oneOf(['admin', 'instructor', 'learner', 'super admin'], 'Invalid role')
    .required('Role is required'),
});

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.users);

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }) => {
    try {
      const res = await dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        })
      ).unwrap();

      toast.success(res.message || 'Registration successful');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed');
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-lightcyan px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Test Series Register New Account</h2>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'learner',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                  <option value="super admin">Super Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>

              {loading && <Loader />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}
