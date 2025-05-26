import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilSettings,
  cilSpreadsheet,
  cilUser
  
  
} from '@coreui/icons'
import { FaFlask, FaBed, FaCogs, FaBoxes, FaUsers, FaClipboardList, FaWarehouse, FaUserShield, FaCartPlus, FaClipboardCheck  } from 'react-icons/fa'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const getNavItems = () => {
  
  const role = localStorage.getItem('role')
  

  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    // Settings (Accessible by all)
    // {
    //   component: CNavGroup,
    //   name: 'Settings',
    //   to: '/settings',
    //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Users',
    //       to: '/base/accordion',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Edit Menu',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Edit Menu Elements',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Edit Roles',
    //       to: '/base/breadcrumbs',
    //     },
    //   ],
    // },
      
      //user management
  {
    component: CNavGroup,
    name: 'Lectures',
    to: '/mattressSettings',
    icon: <FaUsers className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Lecture',
        to: '/add-video-lecture',
      },
      {
        component: CNavItem,
        name: 'Lecture List',
        to: '/lecturelist',
      }
      
    ],
  },

  {
    component: CNavGroup,
    name: 'Paper',
    to: '/',
    icon: <FaUsers className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Paper',
        to: '/add-paper',
      },
      {
        component: CNavItem,
        name: 'Paper List',
        to: '/paperlist',
      }
      
    ],
  },

    //User roles
    {
      component: CNavGroup,
      name: 'User Roles',
      to: '/',
      icon: <FaUserShield  className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add User Roles',
          to: '/add-role',
        },
        {
          component: CNavItem,
          name: 'User Role List',
          to: '/user-role-management',
        },
        
      ],
    },

    
    {
      component: CNavGroup,
      name: 'categories',
      to: '/mattressSettings',
      icon: <FaClipboardList className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add Category',
          to: '/add-category',
        },
        {
          component: CNavItem,
          name: 'Category Lists',
          to: '/categorylist',
        },
        
      ],
    },

    {
      component: CNavGroup,
      name: 'Readings',
      to: '#',
      icon: <FaClipboardList className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add Reading',
          to: '/add-reading',
        },
        {
          component: CNavItem,
          name: 'Reading Lists',
          to: '/reading-list',
        },
        
      ],
    },
    {
      component: CNavGroup,
      name: 'Feedbacks',
      to: '#',
      icon: <FaClipboardList className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Feedback Lists',
          to: '/feedback-list',
        },
        
      ],
    },


  ].filter(Boolean); 
};




export default getNavItems
