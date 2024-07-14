import "@/assets/Styles/login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { sendUpdatedUserData } from "@/Features/userSlice.js";
import { validationSchema, formValidation } from './Login/validation';
import { useSelector } from "react-redux";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {fullName,email,address,gender,dateOfBirth}=useSelector(state=>state.user.user)

    useEffect(() => {
        
        formValidation();

        const applyCSSChanges = () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                nav.classList.remove("scrolled-navbar");
            }
        };
        applyCSSChanges();
        return () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                nav.classList.add("scrolled-navbar");
            }
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            fullName,
            email,
            address,
            gender,
            dateOfBirth,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(sendUpdatedUserData(values)).unwrap();
                navigate('/');
            } catch (error) {
                console.error('Failed to send user data:', error);
            } finally {
                resetForm();
            }
        },
    });

    return (
        <div className="loginPage">
            <h2 className="title"><span className="small">Update your Personal Informatiion</span></h2>
            <form className="login-form needs-validation" onSubmit={formik.handleSubmit} noValidate>
                <label className="label form-label">Full Name</label>
                <input
                    className={`input form-control ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                    type="text"
                    placeholder="Name"
                    id="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoFocus
                    required
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="invalid-feedback">{formik.errors.fullName}</div>
                ) : null}

                <label className="label form-label">Email Address</label>
                <input
                    className={`input form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    type="email"
                    placeholder="Email-id"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}

                <label className="label form-label">Address</label>
                <input
                    className={`input form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                    type="text"
                    placeholder="e.g: House 6, New Coloney, YejByour"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                />
                {formik.touched.address && formik.errors.address ? (
                    <div className="invalid-feedback">{formik.errors.address}</div>
                ) : null}

                <label className="label gender form-label">Gender</label>
                <section className="genderChoice">
                    <label className="gen-label form-label">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formik.values.gender === "male"}
                            onChange={formik.handleChange}
                            required
                        /> Male
                    </label>
                    <label className="gen-label form-label">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formik.values.gender === "female"}
                            onChange={formik.handleChange}
                            required
                        /> Female
                    </label>
                </section>
                {formik.touched.gender && formik.errors.gender ? (
                    <div className="invalid-feedback">{formik.errors.gender}</div>
                ) : null}

                <label className="label form-label">Date of Birth</label>
                <input
                    className={`input form-control ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
                    type="date"
                    id="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="invalid-feedback">{formik.errors.dateOfBirth}</div>
                ) : null}

                <button className="btn" type="submit">Update</button>
            </form>
        </div>
    );
}

export default Login;
