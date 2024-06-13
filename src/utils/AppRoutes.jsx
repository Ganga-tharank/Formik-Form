import React from 'react'
import AddAuthor from '../components/Authors/AddAuthor'
import DashboardAuthor from '../components/Authors/DashboardAuthor'
import EditAuthor from '../components/Authors/EditAuthor'
import AddBooks from '../components/Books/AddBooks'
import EditBooks from '../components/Books/EditBooks'
import DashboardBooks from '../components/Books/DashboardBooks'
import { Navigate } from 'react-router-dom'

const AppRoutes = [
  {
    path: "/",
    element: <DashboardBooks />,
    exact: true,
  },
  {
    path: "/add-book",
    element: <AddBooks />,
    exact: true,
  },
  {
    path: "/edit-book/:id",
    element: <EditBooks />,
    exact: true,
  },
  {
    path: "/dashboard-author",
    element: <DashboardAuthor />,
    exact: true,
  },
  {
    path: "/add-author",
    element: <AddAuthor />,
    exact: true,
  },
  {
    path: "/edit-author/:id",
    element: <EditAuthor />,
    exact: true,
  },
  {
    path: "*",
    element: <Navigate to='/' />,
    exact: false,
  },
];

export default AppRoutes