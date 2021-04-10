import { Component, OnInit, Input } from '@angular/core';
import { IGame } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	@Input() game: IGame;

  constructor() { }

  ngOnInit(): void {
  }

}
