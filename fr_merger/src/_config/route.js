import React from 'react';

const SignUp1 = React.lazy(() => import('../Demo/Authentication/SignUp/SignUp1'));
const Login = React.lazy(() => import('../screens/login/Login'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Login }
];

export default route;