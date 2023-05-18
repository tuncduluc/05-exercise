
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../contexts/Auth";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { signIn } = useContext(AuthContext)
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const passwordConfirmationRef = useRef()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
        
    const handleRegister = () => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}users/register`, {
            method: 'post',
            body: JSON.stringify({
                email: emailRef.current.value,
                name: nameRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: passwordConfirmationRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            response.json().then((json) => {
                // json data
                if (json.success) {
                    signIn(json.token, json.data)
                    navigate('/login')
                } else {
                    alert('Registration failed.')
                }
                setLoading(false);
            });
        }).catch((e) => {
            console.log(e)
            setLoading(false);
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className={`register my-5 p-5`}>
                        <div className={`logo mb-4`}>
                            <img src="" alt='' />
                        </div>
                        <h1 className={`title mb-4`}>Login</h1>
                        <div className='form-field mb-3'>
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input type='email' ref={emailRef} id="email" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='name' className='mb-2'>Name</label>
                            <input type='name' ref={nameRef} id="name" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input type='password' ref={passwordRef} id="password" className='form-control' />              
                        </div>
                        <div>
                        <label htmlFor='password_confirmation' className='mb-2'>Password Confirmation</label>
                            <input type='password_confirmation' ref={passwordConfirmationRef} id="password_confirmation" className='form-control' />
                        </div>
                        <div className='row mt-5 align-items-center'>
                            
                            <div className='col-7'>
                                <button
                                    onClick={handleRegister}
                                    type='button'
                                    className='btn btn-primary w-100'
                                    disabled={loading}>
                                        {loading ? 'Please Wait' : 'Register'}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }


export default Register