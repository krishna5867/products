import React, { useState } from 'react'
// import { Auth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';

const Form = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        );
    }
    function validate() {
        let isValid = true;
        let err = { ...error }
        if (!formData.name) {
            err.name = 'Please enter your name';
            isValid = false;
        } else {
            err.name = ''
        }
        if (!formData.email) {
            err.email = 'Please enter your email';
            isValid = false;
        } else {
            err.email = ''
        }
        if (!formData.password) {
            err.password = 'Please enter your password';
            isValid = false;
        } else if (formData.password.length < 6) {
            err.password = 'Password must be at least 6 characters';
            isValid = false;
        } else {
            err.password = ''
        }

        setError(err);
        return isValid;

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return;
        dispatch(login({
            name: formData.name,
            email: formData.email,
            password: formData.password
        }));
    }
    return (
        <div>
            <div className="flex flex-col gap-4">
                <div>
                    <input type="text" placeholder='Enter Name' name='name' value={formData.name} onChange={handleChange} className='border-2 border-black' />
                    <p className='text-red-500'>{error.name}</p>
                </div>
                <div>
                    <input type="email" placeholder='Enter Email' name='email' value={formData.email} onChange={handleChange} className='border-2 border-black' />
                    <p className='text-red-500'>{error.email}</p>
                </div>
                <div>
                    <input type="password" placeholder='Enter Password' name='password' value={formData.password} onChange={handleChange} className='border-2 border-black' />
                    <p className='text-red-500'>{error.password}</p>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )
}

export default Form
