import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx'
import SingleUser from './Pages/SingleUser.jsx';
import Profile from './Pages/Profile.jsx';  // Capitalized "Profile" to keep consistency
import Register from './Pages/Register.jsx';
import Home from './Pages/Home.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import BlogDetails from './Pages/BlogDetails.jsx';
import ErrorPage from './Pages/errrorpage.jsx'; // Capitalized "ErrorPage" for consistency

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'blogdetails/:id',
        element: <BlogDetails />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'profile',
        element: <ProtectedRoutes component={<Profile />} />,
      },
      {
        path: 'dashboard',
        element: <ProtectedRoutes component={<Dashboard />} />,
      },
      {
        path: 'user',
        element: <ProtectedRoutes component={<SingleUser />} />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
