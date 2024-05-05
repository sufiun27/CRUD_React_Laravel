import {Link} from 'react-router-dom';
import { useState, createRef } from 'react';
import axiosClient from '../axios-clint';
import {useStateContext} from '../context/ContextProvider';

function Signup() {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = (e)=>{
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
          }
    
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
    }

    return (
        <>
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          
        </form>
        </>
    )
}

export default Signup
