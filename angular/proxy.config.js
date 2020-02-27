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
    },
    {
      context: '/sicds-cliente-api/web',
      target: 'http://localhost:8080'
    },
    {
      context: '/sicds-cliente-api',
      target: 'http://localhost:8080'
    }
  ];

  module.exports = proxy;
