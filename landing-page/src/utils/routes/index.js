// define the Route
const ROUTES = {
    GUEST_HOME: '/',
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    CONFIRM_EMAIL: '/confirm-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESEND_PASSWORD: '/resend-password',
    SUCCESS_CONFIRM: '/email-success-confirm',
    PROFILE: '/profile',
    PAYMENT: '/payment',
    FEEDBACK:'/feedback',
    CONTACT: '/contact',
    FAQ: '/faq',
    BLOG: '/blog',
    BLOG_DETAILS: '/blog/:id',
    FORUM: '/forum',
    FAVORITES: '/favorites',
    TOUR_DETAIL: '/tour-detail/:id',
    CONFESSION: '/confession',
    MESSAGE: '/message',
    SERVICES: '/services',
    CHECKOUT: '/checkout',
    NOTIFICATION: '/notification',
    CHARACTER: '/character/:id',
    ADMIN: {
      DASHBOARD: '/admin',
      REVENUE: '/admin/revenue',
      MEMBER: '/admin/member',
      TOUR: '/admin/tour',
      FAQ: '/admin/faq',
      FEEDBACK: '/admin/feedback',
      CONTACT: '/admin/contact',
    },
    NOT_FOUND: '*'
  }
  export default ROUTES
  