export const UserScheme = {
  name: {
    name: 'Name',
    type: 'text',
    validation: [ 'isRequired' ],
    formField: true,
  },

  password: {
    name: 'Password',
    type: 'password',
    validation: [ 'isRequired' ],
    formField: true,
  }
};

