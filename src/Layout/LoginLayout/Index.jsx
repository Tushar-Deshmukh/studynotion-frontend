import React from 'react'
import Header from '../HomeLayout/Header'

export default function Index({children}) {
  return (
    <div>
        <Header/>
        <div className="pt-[65px]">
        <div className="p-4 h-loginLayout">{children}</div>
      </div>
    </div>
  )
}
