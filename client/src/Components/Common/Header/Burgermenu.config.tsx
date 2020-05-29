const userMenuItems = () => [
  { icon: 'fas fa-home', to: '/', text: 'Home' },
  {
    icon: 'fas fa-address-card',
    to: '/user/profile',
    text: 'Profile',
  },
  { icon: 'fas fa-sign-out-alt', to: '/user/Logout', text: ' Logout' },
];

const anonymousMenuItems = () => [
  { icon: 'fas fa-home', to: '/', text: 'Home' },
  { icon: 'fas fa-sign-in-alt', to: '/user/login', text: ' Login' },
  { icon: 'fas fa-child', to: '/user/SignUp', text: ' signUp' },
];

const adminMenuItems = () => [
  { icon: 'fas fa-home', to: '/admin/', text: 'Dashboard' },
  {
    icon: 'fas fa-calendar-alt',
    to: '/admin/Events',
    text: 'Events',
  },
  {
    icon: 'far fa-calendar-plus',
    to: '/admin/Event/NewEvent',
    text: ' New Event',
  },

  // {
  //   icon: 'fas fa-user-plus',
  //   to: '/admin/user/NewMember',
  //   text: 'New member',
  // },
  { icon: 'fas fa-sign-out-alt', to: '/user/Logout', text: ' Logout' },
];

export { userMenuItems, anonymousMenuItems, adminMenuItems };
