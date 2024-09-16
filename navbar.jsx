import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-3'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9 cursor-pointer '>
            <li className='hover:font-bold transition-all'>Todos</li>
            <li className='hover:font-bold transition-all'>Home</li>
        </ul>
    </nav>
  )
}

export default Navbar
