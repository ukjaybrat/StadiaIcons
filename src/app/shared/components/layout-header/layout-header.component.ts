import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {

	activeHome: 		boolean;
	activeStore: 		boolean;
	activeSettings: boolean;
	activeUser: 		boolean;

  constructor(
		public router: Router
	) {
		// when route changes detect active tab
		router.events.subscribe((val) => {
			this.activeHome  		= this.router.url === '/';
			this.activeStore 		= this.router.url === '/store';
			this.activeSettings = this.router.url === '/settings';
			this.activeUser 		= this.router.url === '/dashboard';
		});
	}

  ngOnInit(): void {
		
  }

}
