export class IGame {
	id: 						string;
	title: 					string;
	cover: 					string;
//cover: 					Blob;
}

export class MyGame implements IGame {
	id: 						string;
	title: 					string;
	cover: 					string;
//cover: 					Blob;
	status:					string;
	folder:					string;
	recentlyPlayed: boolean;
}