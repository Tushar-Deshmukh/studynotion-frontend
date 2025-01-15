import React from 'react'
import Header from '../HomeLayout/Header'

export default function Index({children}) {
  return (
    <div>
        <Header/>
        <div className="pt-[78px]">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
