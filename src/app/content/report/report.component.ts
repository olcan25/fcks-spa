import { Component, OnInit } from '@angular/core';
import { CompareDate } from 'src/app/core/models/compare-date.model';
import { LedgerService } from 'src/app/core/services/api-services/ledger/ledger.service';
import { ReportService } from 'src/app/core/services/api-services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  data: any[] = [];
  compareDate: CompareDate = new CompareDate();

  constructor(private ledgerService: LedgerService) {}
  ngOnInit(): void {}
}
