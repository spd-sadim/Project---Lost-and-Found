import React from 'react'

export default function FormWrapper({children}) {
  return (
    <div className='form-wrapper px-4 py-3 rounded border bg-white'>
        {children}
    </div>
  )
}
