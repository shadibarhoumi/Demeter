import React from 'react'
import { Navbar } from './Navbar'

const Page: React.FC = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  )
}

export default Page
