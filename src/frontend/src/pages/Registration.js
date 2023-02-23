import React, {useContext} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from 'yup'
import axios from "axios"
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";

function Registration() {

    const {setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(6).max(20).required()

    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            }
            else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                navigate("/");
            }
        })
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer" >
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field id="inputAddQuote" name="username" placeholder="Username"/>
                    <label>Password:</label>
                    <ErrorMessage name="password" component="span"/>
                    <Field id="inputAddQuote" type="password" name="password" placeholder="Password"/>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration