import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const Body = () => {

    const appRouer=createBrowserRouter([
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/browse',
            element:<Browse/>
        }
    ]);

  return (
    <div> 
        <RouterProvider router={appRouer} />
    </div>
  )
}

export default Body