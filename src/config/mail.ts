interface IMailConfig {
  driver: 'ethereal' | 'sparkpost';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'admin@codado.dev',
      name: 'Fabricyo Barreto',
    },
  },
} as IMailConfig;
