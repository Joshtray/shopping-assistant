import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import axios from '../axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const authHeader = () => {
        let user = localStorage.getItem('user');    
        if (user) {
            const result = JSON.parse(user)
            if (result.token) {
                navigate("/")
                return { Authorization: 'Bearer ' + result.token };
            }
        } 
        else {
            console.log({})
            return {};
        }
        }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleRegister = (event) => {
        const username = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value

        const data = {
            username: username,
            email: email,
            password: password
        }

        event.preventDefault();
        axios.post('/register', data, {headers: {...authHeader}}
        ).then((res) => {
        if (res.data && !res.data.error) {
            console.log('Account Succefully Created!')
            navigate('/login')
        }
        else if (res.data.error) {
            setError(res.data.error)
            console.log(res.data.error)
        }
        else {
            console.log(res.data)
        }
        }).catch((err) => {
            console.log(err)
        });
    };

    useEffect(() => {
        authHeader()
    }, [])
    
    return (
        <RegisterPageWrapper>
        <FormWrapper>
            <FormTitle>Sign up to Shopping Assistant</FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form onSubmit={handleRegister}>
                <InputWrapper>
                    <FormGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                    </FormGroup>
                </InputWrapper>
                <Links>
                    <Button type="submit">Register</Button>
                    <StyledLink to="/login">Login</StyledLink>
                </Links>
            </form>
        </FormWrapper>
        </RegisterPageWrapper>
      );
    }
    
    export default Register;
    
    const RegisterPageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        background-color: #7AB3B0;
        height: 100%;
        `;

        const FormWrapper = styled.div`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        padding: 40px;
        width: 100%;
        max-width: 600px;
        `;

        const FormTitle = styled.h1`
        margin-top: 0;
        margin-bottom: 70px;
        font-size: 36px;
        color: #333;
        text-align: center;
        `;

        const FormGroup = styled.div`
        margin-bottom: 20px;
        `;

        const Label = styled.label`
        display: block;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #3D405B;
        `;

        const ErrorMessage = styled.p`
        color: red;
        font-weight: bold;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid red;
        border-radius: 4px;
        text-align: center;
        `;

        const InputWrapper = styled.div`
        margin-bottom: 50px;
        `;

        const Input = styled.input`
        width: 100%;
        height: 40px;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        color: #333;
        box-sizing: border-box;

        &:focus {
            border-color: #007bff;
            outline: none;
        }

        &::placeholder {
            color: #999;
        }
        `;


        const Links = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        `;

        const Button = styled.button`
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        background-color: rgb(64 188 188);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: rgb(56 163 148);
        }
        `;


        const StyledLink = styled(Link)`
        text-decoration: none;
        color: #007bff;
        font-weight: 600;
        &:hover {
            text-decoration: underline;
        }
        `;