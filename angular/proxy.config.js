const proxy = [
    {
      context: '/sc-user/api',
      target: 'http://localhost:3000'
    },
    {
      context: '/sc-colaborador/api',
      target: 'http://localhost:3000'
    }
  ];

  module.exports = proxy;
