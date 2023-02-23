import React, {useContext} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from 'yup'
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";

function AddQuote() {
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        title: "",
        body: "",
        username: authState.username,
        description: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        body: Yup.string(),
        description: Yup.string().required()

    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/quotes", data)
        .then((response) => {
          console.log("New quote submitted");
        })
        navigate("/")
    }

    if(!authState.status){
        navigate("/login")
    }    return (
        <div className="addQuotePage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer" >
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputAddQuote" name="title" placeholder="Title"/>
                    <label>Description:</label>
                    <ErrorMessage name="description" component="span"/>
                    <Field id="inputAddQuote" name="description" placeholder="Description"/>
                    <label>Quote:</label>
                    <ErrorMessage name="body" component="span"/>
                    <Field id="inputAddQuoteField" name="body" placeholder="Quote"/>
                    
                    <button type="submit">Add Quote</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddQuote