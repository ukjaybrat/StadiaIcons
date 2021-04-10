export class IGame {
	id: 						string;
	title: 					string;
	coverUrl: 			string;
//cover: 					Blob;
}

export class MyGame implements IGame {
	id: 						string;
	title: 					string;
	coverUrl: 			string;
//cover: 					Blob;
	ownership:			any;
	status:					string;
	folder:					string;
	recentlyPlayed: boolean;
}