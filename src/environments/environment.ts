// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey:							'AIzaSyCFnW-fh1GpbaslkrLvnMLQz19zIXxwVcs',
		authDomain:					'stadia-icons.web.app',
		databaseURL:				'https://stadia-icons-default-rtdb.firebaseio.com/',
		projectId: 					'stadia-icons',
		storageBucket: 			'gs://stadia-icons.appspot.com',
		messagingSenderId: 	'<your-messaging-sender-id>',
		appId:							'1:984359218159:web:9b666ccad39d3264fd641a',
		measurementId:			'<your-measurement-id>'
 	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
