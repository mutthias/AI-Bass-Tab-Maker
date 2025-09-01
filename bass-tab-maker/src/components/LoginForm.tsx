"use client";

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [err, setErr] = useState("");
  const [status, setStatus] = useState("");

  const TryLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");
    setStatus("");
    if (!email || !password || (!isLogin && !confirmPw)) {
      setErr("Please fill in all fields.");
      return;
    } else if (!isLogin && password !== confirmPw) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      const endpoint = isLogin ? "auth/login" : "auth/register";

      const res = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data.message || "Something went wrong with the request.");
      } else {
        setStatus(data.message || (isLogin ? "Logged in." : "Registered user."));
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);

    } catch (error) {
      setErr("Something is wrong with the server. Try again later!");
    }
  }

  return (
    <div className='flex items-center justify-center px-4'>

      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          {isLogin ? "Login" : "Register"}
        </h2>
        {err && <p className='text-red-500 mb-4'>{err}</p>}
        {status && <p className='text-green-500 mb-4'>{status}</p>}
      

        <form onSubmit={TryLogin} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500'
          />
          
          {!isLogin && (
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        
        <p className='mt-4 text-center text-gray-600'>
          {isLogin ? "Dont have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErr("");
              setStatus("");
            }}
            className='text-blue-500 hover:underline font-semibold cursor-pointer'
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm