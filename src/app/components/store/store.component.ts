import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGame, MyGame } from '../game/game';
import { User } from '../../shared/services/user';
import * as firebase from 'firebase';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

	user: 							User;
	games:							IGame[];

	gamesUnowned:				MyGame[];
	gamesWishlist:			MyGame[];
	gamesClaimed:				MyGame[];
	gamesPurchased:			MyGame[];

	constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
		public firestore: AngularFirestore,
		public firestorage: AngularFireStorage
  ) {
		
  }

  ngOnInit() {
		this.populateData();
	}

	private populateData() {
		this.user = this.authService.userData;

		// Get all games
		this.firestore.collection<IGame>('games').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as IGame;
				data.id = a.payload.doc.id;
				return { ...data } as IGame;
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
		
		// Get Wishlist
		this.firestore
			.collection('users')
			.doc(this.user.uid)
			.collection('games', ref => ref.where('ownership', '==', this.firestore.doc('ownership/' + 1).ref)).snapshotChanges().pipe(map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as MyGame;
					data.id = a.payload.doc.id;
					return { ...data } as MyGame;
				});
			})).subscribe(
					result => {
						this.gamesWishlist = result;
						this.gamesWishlist.forEach(g => {
							g.title    = this.games.find(f => f.id == g.id).title,
							g.coverUrl = this.games.find(f => f.id == g.id).coverUrl
						});
					},
					error => {
		
					}
				);

		// Get Claimed Games
		this.firestore
			.collection('users')
			.doc(this.user.uid)
			.collection('games', ref => ref.where('ownership', '==', this.firestore.doc('ownership/' + 2).ref)).snapshotChanges().pipe(map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as MyGame;
					data.id = a.payload.doc.id;
					return { ...data } as MyGame;
				});
			})).subscribe(
					result => {
						this.gamesClaimed = result;
						this.gamesClaimed.forEach(g => {
							g.title    = this.games.find(f => f.id == g.id).title,
							g.coverUrl = this.games.find(f => f.id == g.id).coverUrl
						});
					},
					error => {
		
					}
				);

			// Get Purchased Games
			this.firestore
				.collection('users')
				.doc(this.user.uid)
				.collection('games', ref => ref.where('ownership', '==', this.firestore.doc('ownership/' + 3).ref)).snapshotChanges().pipe(map(actions => {
					return actions.map(a => {
						const data = a.payload.doc.data() as MyGame;
						data.id = a.payload.doc.id;
						return { ...data } as MyGame;
					});
				})).subscribe(
						result => {
							this.gamesPurchased = result;
							this.gamesPurchased.forEach(g => {
								g.title    = this.games.find(f => f.id == g.id).title,
								g.coverUrl = this.games.find(f => f.id == g.id).coverUrl
							});
						},
						error => {
			
						}
					);

			// Get Unowned Games
			this.firestore
				.collection('users')
				.doc(this.user.uid)
				.collection('games', ref => ref.where('ownership', '==', this.firestore.doc('ownership/' + 0).ref)).snapshotChanges().pipe(map(actions => {
					return actions.map(a => {
						const data = a.payload.doc.data() as MyGame;
						data.id = a.payload.doc.id;
						return { ...data } as MyGame;
					});
				})).subscribe(
						result => {
							this.gamesUnowned = result;
							this.gamesUnowned.forEach(g => {
								g.title    = this.games.find(f => f.id == g.id).title,
								g.coverUrl = this.games.find(f => f.id == g.id).coverUrl
							});
						},
						error => {
			
						}
					);
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
