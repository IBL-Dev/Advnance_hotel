// AdminLayout.js
import React from 'react'
import Sidebar from '../../component/admin/sidebar'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
