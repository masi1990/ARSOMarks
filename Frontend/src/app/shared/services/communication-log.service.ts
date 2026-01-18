import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CommunicationType = 'EMAIL' | 'SYSTEM';
export type CommunicationStatus = 'DELIVERED' | 'PENDING' | 'FAILED';

export interface CommunicationLog {
  id: string;
  type: CommunicationType;
  timestamp: Date;
  subject: string;
  message: string;
  recipient: string;
  status: CommunicationStatus;
}

@Injectable({ providedIn: 'root' })
export class CommunicationLogService {
  private readonly storageKey = 'communicationLogs';
  private readonly logsSubject = new BehaviorSubject<CommunicationLog[]>(this.readLogs());

  logs$ = this.logsSubject.asObservable();

  addLog(entry: Omit<CommunicationLog, 'id' | 'timestamp'> & { timestamp?: Date }): void {
    const log: CommunicationLog = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: entry.timestamp ?? new Date(),
    };
    const next = [log, ...this.readLogs()];
    this.writeLogs(next);
    this.logsSubject.next(next);
  }

  getLogs(): CommunicationLog[] {
    return this.readLogs();
  }

  private readLogs(): CommunicationLog[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as CommunicationLog[];
      return parsed.map((item) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }));
    } catch {
      return [];
    }
  }

  private writeLogs(logs: CommunicationLog[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(logs));
  }
}
