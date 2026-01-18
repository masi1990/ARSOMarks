import { Component } from '@angular/core';

interface ToolCard {
  title: string;
  description: string;
  cta?: string;
  link?: string;
}

@Component({
  selector: 'app-shared-tools',
  templateUrl: './shared-tools.component.html',
  styleUrls: ['./shared-tools.component.scss'],
})
export class SharedToolsComponent {
  tools: ToolCard[] = [
    {
      title: 'Mediation Board Portal',
      description: 'Annex A dispute mediation workspace with case tracking and outcomes.',
      cta: 'Open Portal',
      link: '/portal/complaints',
    },
    {
      title: 'Document Version Viewer',
      description: 'Track ACAP normative document versions and changes.',
      cta: 'View Documents',
      link: '/portal/documents',
    },
    {
      title: 'Fee Calculator',
      description: 'Estimate certification/licensing fees and royalties.',
      cta: 'Calculate Fees',
      link: '/portal/mark-licenses/reports',
    },
    {
      title: 'Mark Usage Guidelines',
      description: 'Interactive guidance for ARSO/ECO mark usage (Annex B).',
      cta: 'View Guidelines',
      link: '/portal/mark-licenses/dashboard',
    },
    {
      title: 'Training & Capacity Portal',
      description: 'Access training materials, webinar schedules, and recordings.',
      cta: 'View Training only',
      link: '/portal/shared-tools',
    },
  ];
}
