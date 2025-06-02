import React from 'react';
import '@/App.css';
import { RouterProvider } from 'react-router-dom';
// import router from '@auth/routes/router';
import router from '@/routes/router';
import { Toaster } from 'sonner';

const App = () => {

  return (
    <div>
    <div className="mt-[800px] fixed top-0 right-0 z-50">
      <Toaster expand position="top-right" />
    </div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
