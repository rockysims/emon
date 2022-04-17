import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

	constructor (
		private http: HttpClient
	) {
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
