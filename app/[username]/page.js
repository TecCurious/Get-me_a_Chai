import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import ConnectDb from '@/components/ConnectDb'
import User from '@/models/User'

// if username not present in db than show 404  


const username = async({params}) => {

const checkuser = async()=>{
  await ConnectDb();
  let u = await User.findOne({username:params.username});

  if(!u){
    return notFound();
  }
}

await checkuser()

  return (

    <>
      <PaymentPage  username={params.username}/>
    
    </>
  )
}

export default username

export async function generateMetadata({ params }) {
  return {
    title: `support ${params.username} Get me A Chai`,
  }
}