import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { query } from 'express';
import { catchError, Observable, of, tap } from 'rxjs';

interface Data {
	userId: number,
	id: number,
	title: string,
	completed: boolean
}

interface Transaction {

}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'eMon';
	loginUrl = '';

	constructor (
		private http: HttpClient
	) {
		const queryParams = [
			'response_type=code',
			`redirect_uri=${encodeURIComponent('https://e-mon-app.herokuapp.com/callback')}`,
			'client_id=14f1fb208e0b4a6791ac8b11915a4083',
			`scope=${encodeURIComponent('esi-wallet.read_character_wallet.v1 esi-contracts.read_character_contracts.v1')}`,
			'state=extraSecurity123'
		];
		this.loginUrl = 'https://login.eveonline.com/v2/oauth/authorize?' + queryParams.join('&');
		
		this.getData().subscribe(v => console.log(v));
		// this.getTransactions().subscribe(v => console.log(v));
	}

	// getTransactions(): Observable<Transaction[]> {
	// 	const charId = 1234;
	// 	const token = 'tokenHere';
	// 	const url = `https://esi.evetech.net/latest/characters/${charId}/wallet/transactions?token=${token}`;
	// 	return this.http.get<Transaction[]>(url).pipe(
	// 		tap(data => console.log(`fetched: ${JSON.stringify(data)}`)),
	// 		catchError(this.handleError<Transaction[]>(`getTransactions()`, []))
	// 	);
	// }

	getData(): Observable<Data> {
		const url = `https://jsonplaceholder.typicode.com/todos/1`;
		return this.http.get<Data>(url).pipe(
			tap(data => console.log(`fetched: ${JSON.stringify(data)}`)),
			catchError(this.handleError<Data>(`someOp`))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T); //let the app keep running by returning an empty result
		};
	}
}
