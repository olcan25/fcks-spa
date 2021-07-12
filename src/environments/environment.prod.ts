export const environment = {
  production: true,
  appVersion: require('../../package.json').version + '-Alpha',
  //'https://192.168.0.53:45455/api/',
  baseUrl:
    //'https://webapi-ql8.conveyor.cloud/api/',
    //'http://46.99.184.130:80/api/',
    // 'http://localhost:81/api/',
    'https://localhost:44339/api/',
  geoDbService: {
    apiKey: 'db850496a6msh4fa90bc3656ef3dp10d094jsnf59a4d4a8e03',
    uri: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
  },
};
