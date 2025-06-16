import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import NoHeaderLayout from "../layouts/NoHeaderLayout";
import AdminDashboard from "../screens/AdminPage/Dashboard/AdminDashboard";
import MemberManagement from "../screens/AdminPage/MemberManagement";
import Revenue from "../screens/AdminPage/Revenue";
import TourManagement from "../screens/AdminPage/TourManagement";
import LoginPage from "../screens/Auth/Login/Login";
import RegisterPage from "../screens/Auth/Register";
import Home from "../screens/CustomerPage/Home/Home";
import { LandingPage } from "../screens/LandingPage";
import ROUTES from "../utils/routes";

const publicRoutes = [
    { path: ROUTES.GUEST_HOME, component: LandingPage, layout: NoHeaderLayout},
    {path: ROUTES.LOGIN, component: LoginPage, layout: NoHeaderLayout},
    {path: ROUTES.REGISTER, component: RegisterPage, layout: NoHeaderLayout},

]
const adminRoutes = [
    {path: ROUTES.ADMIN.DASHBOARD, component: AdminDashboard, layout: AdminLayout},
    {path: ROUTES.ADMIN.MEMBER, component: MemberManagement, layout: AdminLayout},
    {path: ROUTES.ADMIN.REVENUE, component: Revenue, layout: AdminLayout},
    {path: ROUTES.ADMIN.TOUR, component: TourManagement, layout: AdminLayout},
]

const memberRoutes = [
    {path: ROUTES.HOME, component: Home, layout: CustomerLayout}
]
export { adminRoutes, memberRoutes, publicRoutes }