import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGame } from '../game/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	gamesCollection: 	AngularFirestoreCollection;
	games:						IGame[];

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
		public firestore: AngularFirestore,
		public firestorage: AngularFireStorage
  ) {
		this.gamesCollection = firestore.collection<IGame>('games');
		this.gamesCollection.snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as IGame;
				data.id = a.payload.doc.id;
				return { ...data } as IGame;
			});
		})).subscribe(
				result => {
					this.games = result;
	
					this.games.forEach((g) => {

						const ref = firestorage.storage.ref('covers/'+g.id+'.webp');
						ref.getDownloadURL().then(
							url => {
								g.coverUrl = url;
							},
							error => {
								const ref = firestorage.storage.ref('covers/_missing.webp');
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
		
  }

  ngOnInit() { }

}
