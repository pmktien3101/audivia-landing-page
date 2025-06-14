// define the Route
const ROUTES = {
    GUEST_HOME: '/',
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    CONFIRM_EMAIL: '/confirm-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESEND_PASSWORD: '/resend-password',
    SUCCESS_CONFIRM: '/email-success-confirm',
    PROFILE: '/profile',
    CONTACT: '/contact',
    FAQ: '/faq',
    BLOG: '/blog',
    BLOG_DETAILS: '/blog/:id',
    FORUM: '/forum',
    SERVICES: '/services',
    CHECKOUT: '/checkout',
    NOTIFICATION: '/notification',
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
  