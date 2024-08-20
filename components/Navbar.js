"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from 'react-toastify'

const Navbar = () => {

  const [showDown, setShowDown] = useState(false);
 
  const { data: session } = useSession()
 
  return (
    <nav className='flex bg-gray-900 justify-between items-center px-4 text-white md:h-16 flex-col md:flex-row'>

      <Link href={"/"} className="font-bold text-3xl md:text-base my-1">GetMeAChai!</Link>

      {/* <ul className='flex gap-6'>
        <li>Home</li>
        <li>About</li>
        <li>Project</li>
        <li>Fund</li>
      </ul> */}

      <div className='flex flex-col gap-2 items-center justify-center md:flex-row relative'>

        {session && <div>
          <button onClick={() => { setShowDown(!showDown) }}  onBlur={()=>{setTimeout(()=>{setShowDown(false)}, 500)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">welcome {session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>

          {/* <!-- Dropdown menu --> */}
          <div id="dropdown" className={`z-10 ${showDown ? "" : "hidden"} absolute mt-2 right-[95px]  bg-slate-700  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-slate-400`}>
            <ul className="py-2 text-sm text-white dark:text-slate-500" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-400 dark:hover:bg-slate-500 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-slate-400 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
              </li>
              <li>
                <Link href="#" onClick={() => { signOut()}} className="block px-4 py-2 hover:bg-slate-400 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </div>}

        {!session && <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">login</button>
        </Link>}

        {session && <button onClick={() => { signOut();}} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1">logout</button>}
      </div>
    </nav>

  )
}

export default Navbar
