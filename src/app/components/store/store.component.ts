import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from "lodash";

import { IGame, MyGame } from '../game/game';
import { User } from '../../shared/services/user';
import { StadiaGamesService } from './stadia-games.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

	user: 							User;
	games:							MyGame[];
	myGames:						MyGame[];

	stadiastore: any;

	gamesUnowned:				MyGame[];
	gamesWishlist:			MyGame[];
	gamesClaimed:				MyGame[];
	gamesPurchased:			MyGame[];

	constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
		public firestore: AngularFirestore,
		public firestorage: AngularFireStorage,
		public stadiaGames: StadiaGamesService
  ) {
		
  }

  ngOnInit() {
		this.populateData();
		this.readStadiaGames();
	}

	private populateData() {
		this.user = this.authService.userData;

		// Get all games
		this.firestore.collection<MyGame>('games').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as MyGame;
				data.id = a.payload.doc.id;
				return { ...data } as MyGame;
			});
		})).subscribe(
			result => {
				this.games = result;

				this.games.forEach((g) => {

					const ref = this.firestorage.storage.ref('covers/'+g.id+'.webp');
					ref.getDownloadURL().then(
						url => {
							g.coverUrl = url;
						},
						error => {
							const ref = this.firestorage.storage.ref('covers/_missing.webp');
							ref.getDownloadURL().then(
								url => {
									g.coverUrl = url;
							});
					});
				});
			},
			error => {

			}
		);

		// Get MyGames
		this.firestore.collection('users').doc(this.user.uid).collection('games').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as MyGame;
				data.id = a.payload.doc.id;
				return { ...data } as MyGame;
			});
		})).subscribe(
			result => {
				this.myGames = result;

				this.myGames.forEach((g) => {
					this.games.find(f => f.id == g.id).ownership 			= g.ownership;
					this.games.find(f => f.id == g.id).status 				= g.status;
					this.games.find(f => f.id == g.id).recentlyPlayed = g.recentlyPlayed;
					this.games.find(f => f.id == g.id).folder 				= g.folder;
				});

				this.gamesWishlist 	= this.games.filter(g => g.ownership && g.ownership.m_.path.segments[6] == "1");
				this.gamesClaimed 	= this.games.filter(g => g.ownership && g.ownership.m_.path.segments[6] == "2");
				this.gamesPurchased = this.games.filter(g => g.ownership && g.ownership.m_.path.segments[6] == "3");
				this.gamesUnowned		= this.games.filter(g => g.ownership == null || g.ownership.m_.path.segments[6] == "0");
			},
			error => {

			}
		);
	}

	private readStadiaGames() {
		this.stadiaGames.read();
	}

	private wishlistAdd(game: IGame) {
		const thisGame = this.firestore.collection('users').doc(this.user.uid).collection('games').doc(game.id);
		const post = {
			ownership: this.firestore.doc('ownership/' + 1).ref
		};
		thisGame.set(post);
	}

	private wishlistRemove(game: IGame) {
		const thisGame = this.firestore.collection('users').doc(this.user.uid).collection('games').doc(game.id);
		const post = {
			ownership: this.firestore.doc('ownership/' + 0).ref
		};
		thisGame.set(post);
	}

	private libraryClaim(game: IGame) {
		const thisGame = this.firestore.collection('users').doc(this.user.uid).collection('games').doc(game.id);
		const post = {
			ownership: this.firestore.doc('ownership/' + 2).ref
		};
		thisGame.set(post);
	}

	private libraryPurchase(game: IGame) {
		const thisGame = this.firestore.collection('users').doc(this.user.uid).collection('games').doc(game.id);
		const post = {
			ownership: this.firestore.doc('ownership/' + 3).ref
		};
		thisGame.set(post);
	}

	private libraryRemove(game: IGame) {
		const thisGame = this.firestore.collection('users').doc(this.user.uid).collection('games').doc(game.id);
		const post = {
			ownership: this.firestore.doc('ownership/' + 0).ref
		};
		thisGame.set(post);
	}

}
