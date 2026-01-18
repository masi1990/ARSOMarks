import { Component, OnInit } from '@angular/core';
import {
  CommunicationLog,
  CommunicationLogService,
} from '../../shared/services/communication-log.service';

@Component({
  selector: 'app-communication-history',
  templateUrl: './communication-history.component.html',
  styleUrls: ['./communication-history.component.scss']
})
export class CommunicationHistoryComponent implements OnInit {
  communicationLogs: CommunicationLog[] = [];
  loading = false;
  filterType: 'ALL' | 'EMAIL' | 'SYSTEM' = 'ALL';

  constructor(private communicationLogService: CommunicationLogService) {}

  ngOnInit(): void {
    this.loadCommunicationLogs();
  }

  loadCommunicationLogs(): void {
    this.loading = true;
    this.communicationLogs = this.communicationLogService.getLogs();
    this.communicationLogService.logs$.subscribe((logs) => {
      this.communicationLogs = logs;
    });
    this.loading = false;
  }

  get filteredLogs(): CommunicationLog[] {
    if (this.filterType === 'ALL') {
      return this.communicationLogs;
    }
    return this.communicationLogs.filter(log => log.type === this.filterType);
  }
}

