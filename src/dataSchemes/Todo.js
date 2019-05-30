import settings from '../../settings';

export const TodoScheme = {
  id: {},

  username: {
    name: 'Name',
    type: 'text',
    validation: [ 'isRequired' ],
    formField: true
  },

  email: {
    name: 'Email',
    type: 'text',
    validation: [ 'isRequired', 'isEmail' ],
    formField: true
  },

  text: {
    name: 'Task',
    type: 'textarea',
    validation: [ 'isRequired' ],
    formField: true
  },

  status: {
    name: 'Status',
    type: 'checkbox',
    values: {
      0: { checked: false, text: 'Not completed' },
      10: { checked: true, text: 'Done', classNames: ['greenish'] },
    },
    initialValue: 0,
    nocreate: true,
    formField: true
  },

  image: {
    name: 'Image',
    type: 'file',
    validation: [{
      isValid: (el) => {
        if (typeof el === 'string') {
          return settings.ALLOWED_IMAGE_EXTENSIONS_REGEXP.test(el) || el.indexOf(settings.RANDOM_IMAGE_URL) === 0;
        }

        return settings.ALLOWED_IMAGE_TYPES.includes(el.type);
      },
      error: 'Image type is not allowed for uploading'
    }],
    formField: true
  }
};
