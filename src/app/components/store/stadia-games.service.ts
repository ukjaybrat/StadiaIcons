import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { Injectable } 	from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiaGamesService {

  constructor(
    private http: HttpClient
    ) { }

	read() {
		return this.http.get('https://stadia.google.com/store/list/3');
	}
}