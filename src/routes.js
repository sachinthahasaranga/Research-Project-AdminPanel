import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//pages
const UserRouteTable = React.lazy(() => import('./views/pages/user-role/UserRouteTable'))
const AddRole = React.lazy(() => import('./views/pages/user-role/AddRole'))
const UpdateRole = React.lazy(() => import('./views/pages/user-role/UpdateRole'))

const UserTable = React.lazy(() => import('./views/pages/user/UserTable'))
const AddUser = React.lazy(() => import('./views/pages/user/AddUser'))
const UpdateUser = React.lazy(() => import('./views/pages/user/UpdateUser'))

const RawMaterialTable = React.lazy(() => import('./views/pages/raw-materials/RawMaterialTable'))
const AddRawMaterial = React.lazy(() => import('./views/pages/raw-materials/AddRawMaterial'))
const UpdateRawMaterial = React.lazy(() => import('./views/pages/raw-materials/UpdateRawMaterial'))

const CartonInventory = React.lazy(() => import('./views/pages/carton-inventory/CartonInventoryTable'))
const AddCarton = React.lazy(() => import('./views/pages/carton-inventory/AddCarton'))
const UpdateCarton = React.lazy(() => import('./views/pages/carton-inventory/UpdateCarton'))

const InnerCover = React.lazy(() => import('./views/pages/inner-cover/InnerCoverTable'))
const AddInnerCover = React.lazy(() => import('./views/pages/inner-cover/AddInnerCover'))
const UpdateInnerCover = React.lazy(() => import('./views/pages/inner-cover/UpdateInnerCover'))

const OuterCover = React.lazy(() => import('./views/pages/outer-cover/OuterCoverTable'))
const AddOuterCover = React.lazy(() => import('./views/pages/outer-cover/AddOuterCover'))
const UpdateOuterCover = React.lazy(() => import('./views/pages/outer-cover/UpdateOuterCover'))

const FinishedProduct = React.lazy(() => import('./views/pages/finished-product/FinishedProductTable'))
const AddFinishedProduct = React.lazy(() => import('./views/pages/finished-product/AddFinishedProduct'))
const UpdateFinishedProduct = React.lazy(() => import('./views/pages/finished-product/UpdateFinishedProduct'))

const PEInventory = React.lazy(() => import('./views/pages/pe-inventory/PEInventoryTable'))
const AddPEInventory = React.lazy(() => import('./views/pages/pe-inventory/AddPEInventory'))
const UpdatePEInventory = React.lazy(() => import('./views/pages/pe-inventory/UpdatePEInventory'))

const OtherInventory = React.lazy(() => import('./views/pages/other-inventory/OtherInventoryTable'))
const AddOtherInventory = React.lazy(() => import('./views/pages/other-inventory/AddOtherInventory'))
const UpdateOtherInventory = React.lazy(() => import('./views/pages/other-inventory/UpdateOtherInventory'))

const TableHistory = React.lazy(() => import('./views/pages/table-history/TableHistory'))
const AddTableHistory = React.lazy(() => import('./views/pages/table-history/AddInventoryHistory'))

const AddVideoLecture = React.lazy(() => import('./views/pages/video-lecture/AddVideoLecture'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },


  { path: '/user-role-management', name: 'User Role Management', element: UserRouteTable },
  { path: '/add-role', name: 'Add New User Role', element: AddRole },
  { path: '/update-role/:id', name: 'User Role Update', element: UpdateRole },

  { path: '/user-management', name: 'User Management', element: UserTable },
  { path: '/add-user', name: 'Add New User', element: AddUser },
  { path: '/update-user/:id', name: 'Update User', element: UpdateUser },

  { path: '/raw-material-inventory', name: 'Raw material List', element: RawMaterialTable },
  { path: '/add-raw-material', name: 'Add Raw material', element: AddRawMaterial },
  { path: '/update-raw-material/:id', name: 'Update Raw material', element: UpdateRawMaterial },

  { path: '/carton-inventory', name: 'Carton List', element: CartonInventory },
  { path: '/add-carton', name: 'Add Carton', element: AddCarton },
  { path: '/update-carton/:id', name: 'Update Carton', element: UpdateCarton },

  { path: '/inner-cover-inventory', name: 'Inner Cover List', element: InnerCover },
  { path: '/add-inner-cover', name: 'Add Inner Cover', element: AddInnerCover },
  { path: '/update-inner-cover/:id', name: 'Update Inner Cover', element: UpdateInnerCover },

  { path: '/outer-cover-inventory', name: 'Outer Cover List', element: OuterCover },
  { path: '/add-outer-cover', name: 'Add Outer Cover', element: AddOuterCover },
  { path: '/update-outer-cover/:id', name: 'Update Outer Cover', element: UpdateOuterCover },

  { path: '/finished-product-inventory', name: 'Finished Product List', element: FinishedProduct },
  { path: '/add-finished-product', name: 'Add Finished Product', element: AddFinishedProduct },
  { path: '/update-finished-product/:id', name: 'Update Finished Product', element: UpdateFinishedProduct },

  { path: '/pe-inventory', name: 'PE Inventory List', element: PEInventory },
  { path: '/add-pe', name: 'Add PE Inventory', element: AddPEInventory },
  { path: '/update-pe/:id', name: 'Update Finished Product', element: UpdatePEInventory },

  { path: '/other-inventory', name: 'Other Inventory List', element: OtherInventory },
  { path: '/add-other-inventory', name: 'Add Other Inventory', element: AddOtherInventory },
  { path: '/update-other-inventory/:id', name: 'Update Finished Product', element: UpdateOtherInventory },

  { path: '/table-history', name: 'Inbound - Outbound', element: TableHistory },
  { path: '/add-history', name: 'Inbound - Outbound', element: AddTableHistory },

  { path: '/add-video-lecture', name: 'video lecture', element: AddVideoLecture },


]

export default routes
