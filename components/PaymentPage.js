"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { fetchUser } from '@/actions/useractions'
import { fetchPayments } from '@/actions/useractions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [currUser, setCurrUser] = useState({});
    const [payments, setPayments] = useState([]);

    let [form, setForm] = useState({ name: '', message: "", amount: "" });

    useEffect(() => {
        getData();
    }, []);

    useEffect(()=>{
        if(!session)
        router.push("/");
      },[router])
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        await pay(form.amount);
        setForm({ name: '', message: "", amount: "" });
    }

    const pay = async (amount) => {
        try {
            let a = await initiate(amount, session?.user.username, form);
            let orderId = a.id; 
            var options = {
                "key": currUser.razorpayKey, 
                "amount": amount * 100, 
                "currency": "INR",
                "name": "Get me A chai",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, 
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    }

    const getData = async () => {
        let currrentUser = await fetchUser(username);
        setCurrUser(currrentUser);

        let dbPayments = await fetchPayments(username);
        setPayments(dbPayments);
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white'></div>

            <div className="cover w-full relative">
                <img className='object-cover w-full h-40 md:h-[250px]' src={currUser.coverpic} alt="" />
                <div className='absolute -bottom-20 right-[38%] md:right-[45%] rounded-full border-2 border-white'>
                    <img className='rounded-full' height={150} width={150} src={currUser.profilepic} alt="" />
                </div>
            </div>

            <div className='flex flex-col items-center justify-center my-24 text-white'>
                <div className='font-bold'>@ {username}</div>
                <div className='text-slate-400'>lets help {username} get a Chai!</div>
                <div className='text-slate-400'> {payments?.length} Payments  ₹{payments.reduce((a, b) => a + b.amount, 0)} raised </div>

                <div className='flex w-[85%] gap-4 mt-11 flex-col md:flex-row'>
                    <div className="givers w-full md:w-1/2 text-white bg-slate-900 rounded-lg p-10 ">
                        <h2 className='font-bold text-2xl mb-6'>Top 10 supporters</h2>
                        {payments.length == 0 && <p>no Payments yet</p>}
                        <ul className='mx-5'>
                            {payments.map((item, i) => {
                                return (<li key={i} className='my-4 flex items-center justify-left'> <img width={25} src="avatar.gif" alt="" /> {item.name} donated  ₹{item.amount} {item.message} ❤️"</li>)
                            })}
                        </ul>
                    </div>

                    <div className="payment w-full md:w-1/2 bg-slate-900 text-white rounded-lg p-10">
                        <h2 className='font-bold text-2xl mb-6'>Make a payment</h2>
                        <div className='flex flex-col gap-2'>
                            <input onChange={handleChange} name='name' value={form.name} className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='enter name' />
                            <input onChange={handleChange} name='message' value={form.message} className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='enter message' />
                            <input onChange={handleChange} name='amount' value={form.amount} className='w-full p-3 rounded-lg bg-slate-800' type="text" placeholder='enter amount' />
                            <button onClick={handleSubmit} type="button" className="text-white w-full bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={form.name?.length < 3 || form.message?.length < 4 || form.amount?.length < 1}>Pay</button>
                        </div>

                        <div className='mt-5 flex flex-col md:flex-row gap-2'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(100) }}>pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(150) }}>pay ₹15</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(200) }}>pay ₹20</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;
