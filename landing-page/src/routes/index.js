import { Route } from "react-router-dom";
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
import Forum from "../screens/CustomerPage/Forum";
import Notification from "../screens/CustomerPage/Notification";
import Favorites from "../screens/CustomerPage/Favorites";
import { LandingPage } from "../screens/LandingPage";
import ROUTES from "../utils/routes";
import MenuProfile from "../screens/CustomerPage/MenuProfile";
import TourDetail from "../screens/CustomerPage/TourDetail";
import Character from "../screens/CustomerPage/Character";

import MenuLayout from "../layouts/MenuLayout";
import MyWallet from "../screens/CustomerPage/Wallet";

import Feedback from "../screens/CustomerPage/Feedback";
import TourAudio from "../screens/CustomerPage/TourAudio";
import { TrialFree } from "../screens/CustomerPage/Trial";
import FeedbackManagement from "../screens/AdminPage/FeedbackManagement";
import Review from "../screens/CustomerPage/Review";
import HistoryTour from "../screens/CustomerPage/HistoryTour";
import AudioPlayer from "../screens/CustomerPage/AudioPlayer";

const publicRoutes = [
    { path: ROUTES.GUEST_HOME, component: LandingPage, layout: NoHeaderLayout },
    { path: ROUTES.LOGIN, component: LoginPage, layout: NoHeaderLayout },
    { path: ROUTES.REGISTER, component: RegisterPage, layout: NoHeaderLayout },

]
const adminRoutes = [
    { path: ROUTES.ADMIN.DASHBOARD, component: AdminDashboard, layout: AdminLayout },
    { path: ROUTES.ADMIN.MEMBER, component: MemberManagement, layout: AdminLayout },
    { path: ROUTES.ADMIN.REVENUE, component: Revenue, layout: AdminLayout },
    { path: ROUTES.ADMIN.TOUR, component: TourManagement, layout: AdminLayout },
    { path: ROUTES.ADMIN.FEEDBACK, component: FeedbackManagement, layout: AdminLayout }

]

const memberRoutes = [
    { path: ROUTES.HOME, component: Home, layout: CustomerLayout },
    { path: ROUTES.PROFILE, component: MenuProfile, layout: MenuLayout },
    { path: ROUTES.WALLET, component: MyWallet, layout: MenuLayout },
    { path: ROUTES.FORUM, component: Forum, layout: CustomerLayout },
    { path: ROUTES.NOTIFICATION, component: Notification, layout: CustomerLayout },
    { path: ROUTES.FAVORITES, component: Favorites, layout: CustomerLayout },
    { path: ROUTES.TOUR_DETAIL, component: TourDetail, layout: CustomerLayout },
    { path: ROUTES.CHARACTER, component: Character, layout: CustomerLayout },
    { path: ROUTES.FEEDBACK, component: Feedback, layout: CustomerLayout },
    { path: ROUTES.HOME, component: Home, layout: CustomerLayout },
    { path: ROUTES.PROFILE_ME, component: MenuProfile, layout: MenuLayout },
    { path: ROUTES.FORUM, component: Forum, layout: CustomerLayout },
    { path: ROUTES.NOTIFICATION, component: Notification, layout: CustomerLayout },
    { path: ROUTES.FAVORITES, component: Favorites, layout: CustomerLayout },
    { path: ROUTES.TOUR_DETAIL, component: TourDetail, layout: CustomerLayout },
    { path: ROUTES.CHARACTER, component: Character, layout: CustomerLayout },
    { path: ROUTES.TOUR_AUDIO, component: TourAudio, layout: CustomerLayout },
    { path: ROUTES.AUDIO_PLAYER, component: AudioPlayer, layout: CustomerLayout },
    { path: ROUTES.TRIAL_FREE, component: TrialFree, layout: CustomerLayout },
    { path: ROUTES.REVIEW, component: Review, layout: CustomerLayout },
    { path: ROUTES.HISTORY_TOUR, component: HistoryTour, layout: MenuLayout },

]
export { adminRoutes, memberRoutes, publicRoutes }