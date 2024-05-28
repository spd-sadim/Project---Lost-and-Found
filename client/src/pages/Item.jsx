import React from 'react'
import NavbarNav from '../components/navbar/NavbarNav'

export default function Item({children}) {
  return (
    <section>
        <NavbarNav />
        <main className='py-5 mt-5'>
        <h3 className='text-center'>Item detail</h3>
            {children}
        </main>
    </section>
  )
}
