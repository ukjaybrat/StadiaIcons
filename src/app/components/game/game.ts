export class IGame {
	id: 						number;
	title: 					string;
	cover: 					string;
//cover: 					Blob;
}

export class MyGame implements IGame {
	id: 						number;
	title: 					string;
	cover: 					string;
//cover: 					Blob;
	status:					string;
	folder:					string;
	recentlyPlayed: boolean;
}