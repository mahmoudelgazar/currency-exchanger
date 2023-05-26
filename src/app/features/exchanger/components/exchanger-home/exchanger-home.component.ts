import { Component, OnInit } from '@angular/core';
import { ExchangerService } from '../../services/exchanger.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-exchanger-home',
  templateUrl: './exchanger-home.component.html',
})
export class ExchangerHomeComponent implements OnInit {
  dataLoading = false;
  latestDataLoading = false;
  timeseriesDataLoading = false;
  isDetails = false;
  latestList: any;
  toDaylatestList: any;
  timeseriesData: any;
  convertedCurrency: any;
  detailsSymbol: any;
  fromObj: any;
  toObj: any;
  from: string | undefined;
  to: string | undefined;
  today = new Date();
  lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

  // chart
  multi: any;
  view: any[] = [700, 300];


  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Monthly';
  yAxisLabel: string = '';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(
    private service: ExchangerService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.from, this.to);
    if (this.router.url.includes('details')) {
      this.isDetails = true;
    }
    this.route.params.subscribe((params: Params) => {
      this.from = params['from'];
      this.to = params['to'];
      if (this.isDetails) {
        this.getTimeseries();
        this.getList();
        this.getSymbolsList();
      }
    });
    if (!this.isDetails) {
      this.from = 'EUR';
      this.to = 'USD';
      this.getLatestData();
      this.getList();
    }
  }

  getList() {
    this.dataLoading = true;
    this.service.getLatestList().subscribe(
      (data: any) => {
        this.dataLoading = false;
        this.latestList = data.rates;
        this.latestList = Object.entries(this.latestList).map(
          ([key, value]) => ({ key, value })
        );
        console.log(this.latestList);
      },
      (err: any) => {
        this.dataLoading = false;
      }
    );
  }
  getSymbolsList() {
    this.service.getSymbolsList().subscribe(
      (data: any) => {
        let symbols = data.symbols;
        symbols = Object.entries(symbols).map(([key, value]) => ({
          key,
          value,
        }));
        symbols.forEach((element: any) => {
          if (element.key == this.to) {
            this.detailsSymbol = element;
          }
        });
        console.log(this.latestList);
      },
      (err: any) => {}
    );
  }
  getLatestData() {
    this.latestDataLoading = true;
    let today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    let obj = {
      base: 'EUR',
      symbols: 'GBP,JPY,USD,AUD,CAD,CNY,QAR,SAR,RUB',
    };
    this.service.getLatestData(today, obj).subscribe(
      (data: any) => {
        this.latestDataLoading = false;
        this.toDaylatestList = data.rates;
        this.toDaylatestList = Object.entries(this.toDaylatestList).map(
          ([key, value]) => ({ key, value })
        );
      },
      (err: any) => {
        this.latestDataLoading = false;
      }
    );
  }
  getTimeseries() {
    this.timeseriesDataLoading = true;
    let obj = {
      start_date: this.datePipe.transform(this.lastYear, 'yyyy-MM-dd'),
      end_date: this.datePipe.transform(this.today, 'yyyy-MM-dd'),
      base: this.from,
      symbols: this.to,
    };
    this.service.getTimeseries(obj).subscribe(
      (data: any) => {
        this.timeseriesData = data.rates;
        this.timeseriesData = Object.entries(this.timeseriesData).map(
          ([name, value]) => ({ name, value })
        );
        this.timeseriesData.forEach((e: any) => {
          const value = Object.values(e.value);
          e.value = value[0];
        });
        this.yAxisLabel = `from ${this.lastYear.getFullYear()} to ${this.today.getFullYear()}`;
        this.multi = [
          {
            name: data.base,
            series: this.timeseriesData,
          },
        ];
        this.timeseriesDataLoading = false;
      },
      (err: any) => {
        this.timeseriesDataLoading = false;
      }
    );
  }

  getDetails(data: any) {
    this.isDetails = data.isDetails;
    this.from = data.fromObj.key;
    this.to = data.toObj.key;
    this.getTimeseries();
  }
  onResize(event: any) {
    this.view = [event.target.innerWidth - 900, 280 ];
  }
}
