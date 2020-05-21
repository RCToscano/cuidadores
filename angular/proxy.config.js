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
      context: '/sicds-colaborador-api/',
      target: 'http://localhost:8080'
    },
    {
      context: '/sicds-generic-api/',
      target: 'http://localhost:8080'
    },
    {
      context: '/sicds-cliente-api/',
      target: 'http://localhost:8080'
    }
  ];

  module.exports = proxy;
