import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	darkMode: boolean = false;

  constructor(
		private localStorage: LocalStorageService
	) { }

  ngOnInit(): void {
		//this.darkMode = localStorage.getItem('darkMode');
  }

}
