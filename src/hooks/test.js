const SMART_ACTION_OPTIONS = {
  notices: {
    name: 'notices',
    type: {
      pending: {
        name: 'pending',
        defaultValue: false,
      },
      fulfilled: {
        name: 'fulfilled',
        defaultValue: false,
      },
      rejected: {
        name: 'rejected',
        defaultValue: true,
      },
    },
  },
  done: {
    name: 'done',
    defaultValue: () => {},
  },
};

console.log(SMART_ACTION_OPTIONS.notices.name);
