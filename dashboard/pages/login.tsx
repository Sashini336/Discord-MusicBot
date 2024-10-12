import Head from "next/head";
import {useEffect} from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/dashboard';

const Login = (_props: any) => {
    useEffect(() => {
        window.location.href = "/api/login"
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            // Here you should store the token and user data
            // For example, using localStorage or a state management library
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (show message to user, etc.)
        }
    };

    return <>
        <Head>
            <title>Logging In | Discord Music Bot</title>
        </Head>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    </>
}


export default Login
