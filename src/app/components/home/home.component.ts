import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { IGame } from '../game/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	games:			IGame[];

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
		public firestore: AngularFirestore,
		public firestorage: AngularFireStorage
  ) {
		//this.obs_games = firestore.collection('games').valueChanges();
		firestore.collection('games').valueChanges().subscribe(
			(result: IGame[]) => {
				this.games = result;

				this.games.forEach((g) => {
					g.cover = 'covers/' + g.title;
					//g.cover = firestorage.storage.ref('covers/'+g.ID);
				});
			},
			error => {

			}
		);
		
  }

  ngOnInit() { }

}
