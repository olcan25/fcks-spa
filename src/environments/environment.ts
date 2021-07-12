// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: require('../../package.json').version + '-Dev',
  //'https://192.168.0.53:45455/api/',
  baseUrl:
    //'https://webapi-ql8.conveyor.cloud/api/',
    //'https://localhost:44339/api/',
    //'http://localhost:81/api/',
    'https://localhost:44339/api/',
  production: false,
  geoDbService: {
    apiKey: 'db850496a6msh4fa90bc3656ef3dp10d094jsnf59a4d4a8e03',
    uri: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
