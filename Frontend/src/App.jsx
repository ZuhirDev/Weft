import React from 'react';
import '@/App.css';
import { RouterProvider } from 'react-router-dom';
import router from '@auth/routes/router';

const App = () => {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
