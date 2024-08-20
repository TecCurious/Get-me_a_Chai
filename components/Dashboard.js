import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchUser } from '@/actions/useractions';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/actions/useractions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Dashboard component that renders a user dashboard form.
 * The form allows users to input their personal information,
 * upload profile and cover photos, and provide Razorpay credentials.
 * 
 * @returns {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {
    const router = useRouter();
  const { data: session, update } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    profilepic: null,
    coverpic: null,
    razorpayKey: '',
    razorpaySecret: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(session){
      getData();
      
    }
    
    if(!session)
    router.push("/login");
  },[router])

  /**
   * Handles changes to the form inputs.
   * Updates the formData state based on the input name and value.
   * If the input is a file (profilePicture or coverPhoto), it updates the state with the selected file.
   * 
   * @param {Event} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
    }
  

  /**
   * Validates the form data.
   * 
   * @returns {boolean} True if the form data is valid, false otherwise.
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.razorpayKey) newErrors.razorpayKey = 'Razorpay Key is required';
    if (!formData.razorpaySecret) newErrors.razorpaySecret = 'Razorpay Secret is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission.
   * Prevents the default form submission behavior and logs the formData.
   * Additional form submission logic can be implemented here.
   * 
   * @param {Event} e - The event object from the form submission.
   * 
   */

    const getData = async()=>{
        let userInfo = await fetchUser(session.user.username);
        setFormData(userInfo);
    }


  const handleSubmit =async (e) => {
    e.preventDefault();
    let c  = confirm("do you want to update your profile");
    if(c){
    update();
    
    if (validate()) {
    let res =  await updateProfile(formData,session.user.username);
    toast("profile updatd");
    }
    }
  };

  return (
    <div className='px-6'>
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-950 text-white shadow-md rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to your Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-slate-50">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            required
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Profile Picture</label>
          <input
            type="text"
            name="profilepic"
            onChange={handleChange}
            value={formData.profilepic}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Cover Photo</label>
          <input
            type="text"
            name="coverpic"
            onChange={handleChange}
            value={formData.coverpic}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Razorpay Key</label>
          <input
            type="text"
            name="razorpayKey"
            value={formData.razorpayKey}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            required
          />
          {errors.razorpayKey && <p className="text-red-500 text-xs mt-1">{errors.razorpayKey}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-50">Razorpay Secret</label>
          <input
            type="password"
            name="razorpaySecret"
            value={formData.razorpaySecret}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-300 rounded-md"
            required
          />
          {errors.razorpaySecret && <p className="text-red-500 text-xs mt-1">{errors.razorpaySecret}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    </div>
  );
}
