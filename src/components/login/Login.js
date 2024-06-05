import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import './login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
  });

  const handleSubmit = async (values) => {
    const username = values.username;
    const password = values.password;
    const credentials = {
      username,
      password
    }
    dispatch(login(credentials))
        .then(() => {
          navigate('/dashboard');
          // window.location.reload();
        })
        .catch((e) => {
          console.log("Err=>",e)
        });
    };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;