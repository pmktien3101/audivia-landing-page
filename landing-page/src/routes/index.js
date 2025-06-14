import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import NoHeaderLayout from "../layouts/NoHeaderLayout";
import AdminDashboard from "../screens/AdminPage/Dashboard/AdminDashboard";
import MemberManagement from "../screens/AdminPage/MemberManagement";
import Revenue from "../screens/AdminPage/Revenue";
import TourManagement from "../screens/AdminPage/TourManagement";
import LoginPage from "../screens/Auth/Login/Login";
import RegisterPage from "../screens/Auth/Register";
import { LandingPage } from "../screens/LandingPage";
import ROUTES from "../utils/routes";

const publicRoutes = [
    { path: ROUTES.GUEST_HOME, component: LandingPage, layout: NoHeaderLayout},
    {path: ROUTES.LOGIN, component: LoginPage, layout: NoHeaderLayout},
    {path: ROUTES.REGISTER, component: RegisterPage, layout: NoHeaderLayout},
    {path: ROUTES.ADMIN.DASHBOARD, component: AdminDashboard, layout: AdminLayout},
    {path: ROUTES.ADMIN.MEMBER, component: MemberManagement, layout: AdminLayout},
    {path: ROUTES.ADMIN.REVENUE, component: Revenue, layout: AdminLayout},
    {path: ROUTES.ADMIN.TOUR, component: TourManagement, layout: AdminLayout}


]
const adminRoutes = [
    // { path: ROUTES.ADMIN.DASHBOARD, component: AdminDashboard, layout: AdminLayout },
    // { path: ROUTES.ADMIN.MEMBER, component: MemberPage, layout: AdminLayout },
    // { path: ROUTES.ADMIN.FEEDBACK, component: FeedBack, layout: AdminLayout },
    // { path: ROUTES.ADMIN.CONTACT, component: ContactAdminPage, layout: AdminLayout },
]

const memberRoutes = [
]
export { adminRoutes, memberRoutes, publicRoutes }