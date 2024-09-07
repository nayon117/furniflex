import  { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { FaApple } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, loading } = useAuth() || {};
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      toast.success("Sign up successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Sign up successful");
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Welcome To</h1>
          <h2 className="text-4xl font-bold text-blue-600 mb-6">FurniFlex</h2>
          <p className="text-gray-600 mb-8">Signup for purchase your desire products</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                {...register("firstname")}
                className="flex-1 p-2 border rounded"
                placeholder="First name (optional)"
              />
              <input
                {...register("lastname")}
                className="flex-1 p-2 border rounded"
                placeholder="Last name (optional)"
              />
            </div>
            <input
              {...register("email", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Email address"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                className="w-full p-2 border rounded pr-10"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password must be at least 6 characters long"}
              </p>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="mr-2"
              />
              <label className="text-sm">I agree to the Terms & Policy</label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">You must agree to the terms</p>}
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded font-bold"
              disabled={loading}
            >
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto" /> : "Signup"}
            </button>
          </form>
          
          <div className="mt-4 text-center">or</div>
          
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="flex-1 border border-gray-300 p-2 rounded flex items-center justify-center"
            >
              <FcGoogle className="mr-2" />Sign in with Google
            </button>
            <button className="flex-1 border border-gray-300 p-2 rounded flex items-center justify-center">
              <FaApple alt="Apple" className="w-5 h-5 mr-2" />Sign in with Apple
            </button>
          </div>
          
          <p className="mt-4 text-center">
            Have an account? <Link to="/sign-in" className="text-blue-600">Sign In</Link>
          </p>
        </div>
      </div>
      
      <div className="flex-1 relative hidden lg:block">
        <img 
          src="/login.png" 
          alt="Furniture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8">
          <div className="text-white text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-500 rounded-full p-3">
                <span className="text-4xl font-bold">F</span>
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4">FurniFlex</h3>
            <p className="text-lg">
              Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;