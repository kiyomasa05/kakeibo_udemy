import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      {/* 子routeを呼ぶ記述 */}
      <Outlet/>
    </div>
  )
}

export default AppLayout

