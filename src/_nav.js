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
    {
      component: CNavGroup,
      name: 'Settings',
      to: '/settings',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Users',
          to: '/base/accordion',
        },
        {
          component: CNavItem,
          name: 'Edit Menu',
          to: '/base/breadcrumbs',
        },
        {
          component: CNavItem,
          name: 'Edit Menu Elements',
          to: '/base/breadcrumbs',
        },
        {
          component: CNavItem,
          name: 'Edit Roles',
          to: '/base/breadcrumbs',
        },
      ],
    },
      
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
        name: 'User Management',
        to: '/user-management',
      }
      
    ],
  },

  {
    component: CNavGroup,
    name: 'Paper',
    to: '/mattressSettings',
    icon: <FaUsers className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Lecture',
        to: '/add-paper',
      },
      {
        component: CNavItem,
        name: 'User Management',
        to: '/user-management',
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

    //Raw Materials
    {
      component: CNavGroup,
      name: 'Raw Materials',
      to: '/mattressSettings',
      icon: <FaClipboardList className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add Raw Materials',
          to: '/add-raw-material',
        },
        {
          component: CNavItem,
          name: 'Raw Materials Lists',
          to: '/raw-material-inventory',
        },
        
      ],
    },

  //Mattress settings
  {
    component: CNavGroup,
    name: 'Mattress',
    to: '/mattressSettings',
    icon: <FaBed className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Mattress',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Mattress Lists',
        to: '/base/breadcrumbs',
      },
      
    ],
  },

  //Carton Setting
  {
    component: CNavGroup,
    name: 'Carton Inventory',
    to: '/mattressSettings',
    icon: <FaCartPlus className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Carton',
        to: '/add-carton',
      },
      {
        component: CNavItem,
        name: 'Carton Lists',
        to: '/carton-inventory',
      },
      
    ],
  },

  //Inner-cover Setting
  {
    component: CNavGroup,
    name: 'Inner-covers',
    to: '/mattressSettings',
    icon: <FaWarehouse className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Inner-cover',
        to: '/add-inner-cover',
      },
      {
        component: CNavItem,
        name: 'Inner-cover Lists',
        to: '/inner-cover-inventory',
      },
      
    ],
  },

  //Outer-cover Setting
  {
    component: CNavGroup,
    name: 'Outer-Covers',
    to: '/mattressSettings',
    icon: <FaClipboardCheck className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Outer-Cover',
        to: '/add-outer-cover',
      },
      {
        component: CNavItem,
        name: 'Outer-Cover Lists',
        to: '/outer-cover-inventory',
      },
      
    ],
  },

  //Finished Products Setting
  {
    component: CNavGroup,
    name: 'Finished Products',
    to: '/mattressSettings',
    icon: <FaWarehouse className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Finished Products',
        to: '/add-finished-product',
      },
      {
        component: CNavItem,
        name: 'Finished Product Lists',
        to: '/finished-product-inventory',
      },
      
    ],
  },

  //PE Inventory
  {
    component: CNavGroup,
    name: 'PE Inventory',
    to: '/mattressSettings',
    icon: <FaClipboardList className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add PE Inventory',
        to: '/add-pe',
      },
      {
        component: CNavItem,
        name: 'PE Inventory Lists',
        to: '/pe-inventory',
      },
      
    ],
  },

  //Other Inventory
  {
    component: CNavGroup,
    name: 'Other Inventory',
    to: '/',
    icon: <FaClipboardList className="me-2" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Other Inventory',
        to: '/add-other-inventory',
      },
      {
        component: CNavItem,
        name: 'Other Inventory Lists',
        to: '/other-inventory',
      },
      
    ],
  },

  

    
    (role === 'admin' || role === 'production manager') && {
      component: CNavGroup,
      name: 'Chemical Settings',
      to: '/chemSettings',
      icon: <FaFlask className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add Chemicals',
          to: '/base/accordion',
        },
        {
          component: CNavItem,
          name: 'Chemical Lists',
          to: '/base/breadcrumbs',
        },
      ],
    },
  
    (role === 'admin' || role === 'Warehouse Manager') && {
      component: CNavGroup,
      name: 'Mattress Settings',
      to: '/mattressSettings',
      icon: <FaBed className="me-2" />,
      items: [
        {
          component: CNavItem,
          name: 'Add Mattress',
          to: '/base/accordion',
        },
        {
          component: CNavItem,
          name: 'Mattress Lists',
          to: '/base/breadcrumbs',
        },
      ],
    },
    // Reports 
    {
      component: CNavGroup,
      name: 'Reports',
      to: '/reports',
      icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Inbound - Outbound',
          to: '/table-history',
        },
        {
          component: CNavItem,
          name: 'Add inbound - Outbound',
          to: '/add-history',
        },
      ],
    },
  ].filter(Boolean); 
};


  /*

  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Calendar'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/calendar/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Smart Pagination',
        href: 'https://coreui.io/react/docs/components/smart-pagination/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Smart Table'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/smart-table/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Virtual Scroller'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/virtual-scroller/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Loading Button'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/loading-button/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Multi Select'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/multi-select/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Range Slider'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/range-slider/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Rating'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/rating/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Date Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/date-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Date Range Picker',
        href: 'https://coreui.io/react/docs/forms/date-range-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Time Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/time-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  */


export default getNavItems
