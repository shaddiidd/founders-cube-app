const linking = {
  prefixes: ['founderscube://'],
  config: {
    screens: {
      Blog: {
        path: 'blog/:id',
        screens: {
          BlogScreen: 'blog/:id',
        },
      },
      Community: {
        path: 'member/:id',
        screens: {
          Member: 'member/:id',
        },
      },
      Notifications: {
        path: 'onboarding/:id',
        screens: {
          Onboarding: 'onboarding/:id',
        },
      },
    },
  },
};

export default linking;
