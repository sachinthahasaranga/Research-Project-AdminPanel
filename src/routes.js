import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const UserTable = React.lazy(() => import('./views/pages/user/UserTable'))
const AddUser = React.lazy(() => import('./views/pages/user/AddUser'))
const UpdateUser = React.lazy(() => import('./views/pages/user/UpdateUser'))


//----------------------------------------------------------------------------------------------
const UserRouteTable = React.lazy(() => import('./views/pages/user-role/UserRouteTable'))
const AddRole = React.lazy(() => import('./views/pages/user-role/AddRole'))
const UpdateRole = React.lazy(() => import('./views/pages/user-role/UpdateRole'))

const AddVideoLecture = React.lazy(() => import('./views/pages/video-lecture/AddVideoLecture'))
const VideoLecture = React.lazy(() => import('./views/pages/video-lecture/LectureTable'))
const UpdateVideoLecture = React.lazy(() => import('./views/pages/video-lecture/UpdateVideoLecture'))


const AddPaper = React.lazy(() => import('./views/pages/paper/AddPaper'))
const Paper = React.lazy(() => import('./views/pages/paper/PaperTable'))
const UpdatePaper = React.lazy(() => import('./views/pages/paper/UpdatePaper'))

const AddCategory = React.lazy(() => import('./views/pages/category/AddCategory'))
const CategoryList = React.lazy(() => import('./views/pages/category/CategoryTable'))
const UpdateCategoryList = React.lazy(() => import('./views/pages/category/UpdateCategory'))

const AddReading = React.lazy(() => import('./views/pages/reading/AddReading'))
const ReadingList = React.lazy(() => import('./views/pages/reading/ReadingTable'))
const UpdateReadingList = React.lazy(() => import('./views/pages/reading/UpdateReading'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/user-role-management', name: 'User Role Management', element: UserRouteTable },
  { path: '/add-role', name: 'Add New User Role', element: AddRole },
  { path: '/update-role/:id', name: 'User Role Update', element: UpdateRole },

  { path: '/user-management', name: 'User Management', element: UserTable },
  { path: '/add-user', name: 'Add New User', element: AddUser },
  { path: '/update-user/:id', name: 'Update User', element: UpdateUser },



  { path: '/add-video-lecture', name: 'Add Video Lecture', element: AddVideoLecture },
  { path: '/lecturelist', name: 'Lecture List', element: VideoLecture },
  { path: '/update-lecture/:id', name: 'Update Video Lecture', element: UpdateVideoLecture },


  { path: '/add-paper', name: 'Add Paper', element: AddPaper },
  { path: '/paperlist', name: 'Paper List', element: Paper },
  { path: '/update-paper/:id', name: 'Update Video Lecture', element: UpdatePaper },

  { path: '/add-category', name: 'Add Category', element: AddCategory },
  { path: '/categorylist', name: 'Category List', element: CategoryList },
  { path: '/update-category/:id', name: 'Update Category', element: UpdateCategoryList },

  { path: '/add-reading', name: 'Add Reading', element: AddReading },
  { path: '/reading-list', name: 'Reading List', element: ReadingList },
  { path: '/update-reading/:id', name: 'Update Category', element: UpdateReadingList },


]

export default routes
