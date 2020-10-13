import React from 'react';

import './../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { userService } from "../../_service/user.service";
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LOGIN_FAIL} from '../../_const/message';

class Login extends React.Component {
    state = { token: null };
    handleSubmit = (data) => {
        const { dispatch } = this.props;
        dispatch(userService.login(data.username, data.password));
    }

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    shouldComponentUpdate(nextStates, nextProps) {
        if(nextStates.authentication.loginFail && this.props.authentication.loginFail !== nextStates.authentication.loginFail ) {
            toast.error(LOGIN_FAIL);
        }
        return true;
    }
    render() {
        return (
            <Aux>
                <Breadcrumb />
                <ToastContainer />
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit}
                >
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r" />
                                <span className="r s" />
                                <span className="r s" />
                                <span className="r" />
                            </div>
                            <Form className="user">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="mb-4">
                                            <i className="feather icon-unlock auth-icon" />
                                        </div>
                                        <h3 className="mb-4">Login</h3>
                                        <div className="input-group mb-3">
                                            <Field
                                                name='username'
                                                type="text"
                                                className="form-control form-control-user"
                                                id="username"
                                                placeholder="Enter Email Address..." />
                                        </div>

                                        <ErrorMessage name="username">
                                            {
                                                (err) => <span className="text text-danger validate-input" style={{ fontSize: '16px' }}>{err}</span>
                                            }
                                        </ErrorMessage>
                                        <div className="input-group mb-4">
                                            <Field
                                                name='password'
                                                type="password"
                                                className="form-control form-control-user"
                                                id="exampleInputPassword"
                                                placeholder="Password" />
                                        </div>
                                        <ErrorMessage name="password">
                                            {
                                                (err) => <div className="text text-danger validate-input" style={{ fontSize: '16px' }}>{err}</div>
                                            }
                                        </ErrorMessage>
                                        <div className="form-group text-left">
                                            <div className="checkbox checkbox-fill d-inline">
                                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                                <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary shadow-2 mb-4" type='submit'>Login</button>
                                        <p className="mb-2 text-muted">Forgot password? </p>
                                        <p className="mb-0 text-muted">Don’t have an account? </p>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Formik>
            </Aux>
        );
    }
}

const mapStateToProps = (state) =>{
    const authentication  = state.authentication;
    return {
        authentication
    };
}

export default withRouter(connect(mapStateToProps, null)(Login));;

