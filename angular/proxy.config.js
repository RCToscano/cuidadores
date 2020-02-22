const proxy = [
    {
      context: '/sc-user/api',
      target: 'http://localhost:3000'
    },
    {
      context: '/sc-colaborador/api',
      target: 'http://localhost:3000'
    },
    {
      context: '/sicds-colaborador-api/web',
      target: 'http://localhost:8081'
    }
  ];

  module.exports = proxy;
