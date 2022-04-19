import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
	public lineChartData: ChartDataSets[] = [];
	public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartOptions: ChartOptions = {
		responsive: true,
	};
	public lineChartColors: Color[] = [{
		borderColor: 'black',
		backgroundColor: 'rgba(255,0,0,0.3)',
	}];
	public lineChartLegend = true;
	public lineChartType: ChartType = 'line';
	public lineChartPlugins = [];
		
	constructor() {}

	ngOnInit(): void {
		const datasetConfig = {
			borderWidth: 2,
			lineTension: 0,
			fill: false,
			pointBackgroundColor: 'rgba(0,0,0,0)',
			pointBorderColor: 'rgba(0,0,0,0)',
		};
		const chartDataList: ChartDataSets[] = [{
			data: [165, 159, 180, 181, 156, 155, 140],
			label: 'Total',
			...datasetConfig,

			borderColor: 'red' //ignored for some reason
		}, {
			data: [65, 59, 80, 81, 56, 55, 40],
			label: 'Series A1',
			...datasetConfig,

			borderColor: 'green'
		}, {
			data: [55, 49, 70, 71, 46, 45, 30],
			label: 'Series A2',
			...datasetConfig,
			borderDash: [5,2],

			borderColor: 'green'
		}, {
			data: [16, 15, 18, 18, 15, 15, 14],
			label: 'Series B1',
			...datasetConfig,

			borderColor: 'blue'
		}, {
			data: [5, 4, 7, 7, 4, 4, 3],
			label: 'Series B2',
			...datasetConfig,
			borderDash: [5,2],

			borderColor: 'blue'
		}];
		this.lineChartData = chartDataList;
	}
}
