import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='flex bg-gray-900 justify-center items-center text-sm md:text-xl px-2 md:px-4 text-white h-16'>
       <p> Copyright &copy; {currentYear} Get Me A chai - All rights reserved</p>
    </footer>
  )
}

export default Footer
