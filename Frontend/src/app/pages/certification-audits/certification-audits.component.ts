import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CertificationAudit,
  CertificationAuditType,
  AuditFindingType,
  TestResultStatus,
} from '../../shared/models/certification-audit.model';
import { EvidenceFile, EvidenceParentType } from '../../shared/models/evidence.model';
import { EvidenceService } from '../../shared/services/evidence.service';
import { CertificationAuditService } from '../../modules/certification-audit/services/certification-audit.service';

@Component({
  selector: 'app-certification-audits',
  templateUrl: './certification-audits.component.html',
  styleUrls: ['./certification-audits.component.scss'],
})
export class CertificationAuditsComponent implements OnInit {
  audits: CertificationAudit[] = [];
  loading = false;
  error = '';
  applicationId = '';

  auditForm: FormGroup;
  findingForm: FormGroup;
  samplingForm: FormGroup;
  testResultForm: FormGroup;
  labForm: FormGroup;

  auditTypes = Object.values(CertificationAuditType);
  findingTypes = Object.values(AuditFindingType);
  testResultStatuses = Object.values(TestResultStatus);

  selectedAuditId = '';
  selectedSamplingId = '';

  laboratories: any[] = [];
  findingEvidence: Record<string, EvidenceFile[]> = {};
  pendingEvidenceFiles: Record<string, File[]> = {};
  evidenceDescriptions: Record<string, string> = {};
  uploadingEvidence: Record<string, boolean> = {};

  constructor(
    private fb: FormBuilder,
    private auditService: CertificationAuditService,
    public evidenceService: EvidenceService,
    private route: ActivatedRoute,
  ) {
    this.auditForm = this.fb.group({
      applicationId: ['', Validators.required],
      auditType: ['', Validators.required],
      plannedDate: [''],
      windowStart: [''],
      windowEnd: [''],
      isUnannounced: [false],
      notes: [''],
    });

    this.findingForm = this.fb.group({
      auditId: ['', Validators.required],
      findingType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      deadlineDate: [''],
    });

    this.samplingForm = this.fb.group({
      auditId: ['', Validators.required],
      samplingMethod: [''],
      samplingLocation: [''],
      quantity: [''],
      quantityUnit: [''],
      traceability: [''],
      sampledAt: [''],
    });

    this.testResultForm = this.fb.group({
      samplingId: ['', Validators.required],
      laboratoryId: [''],
      parametersJson: [''],
      reportFilePath: [''],
      resultStatus: ['', Validators.required],
      testedAt: [''],
    });

    this.labForm = this.fb.group({
      name: ['', Validators.required],
      accreditationNumber: [''],
      isAccredited: [false],
      scope: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.applicationId = params['applicationId'] || '';
      if (this.applicationId) {
        this.auditForm.patchValue({ applicationId: this.applicationId });
        this.loadAudits();
      }
    });
    this.loadLaboratories();
  }

  loadAudits(): void {
    this.loading = true;
    this.auditService.listAudits(this.applicationId).subscribe({
      next: (audits) => {
        this.audits = audits || [];
        this.loading = false;
        if (this.selectedAuditId) {
          this.loadEvidenceForAudit(this.selectedAuditId);
        }
      },
      error: () => {
        this.error = 'Failed to load audits';
        this.loading = false;
      },
    });
  }

  loadLaboratories(): void {
    this.auditService.listLaboratories().subscribe({
      next: (labs) => (this.laboratories = labs || []),
    });
  }

  createAudit(): void {
    if (this.auditForm.invalid) {
      this.error = 'Please fill required audit fields';
      return;
    }
    this.auditService.createAudit(this.auditForm.value).subscribe({
      next: () => {
        this.auditForm.reset({ applicationId: this.applicationId, isUnannounced: false });
        this.loadAudits();
      },
      error: () => (this.error = 'Failed to create audit'),
    });
  }

  selectAudit(auditId: string): void {
    this.selectedAuditId = auditId;
    this.findingForm.patchValue({ auditId });
    this.samplingForm.patchValue({ auditId });
    this.loadEvidenceForAudit(auditId);
  }

  addFinding(): void {
    if (this.findingForm.invalid) {
      this.error = 'Please fill required finding fields';
      return;
    }
    this.auditService.addFinding(this.findingForm.value).subscribe({
      next: () => {
        this.findingForm.reset({ auditId: this.selectedAuditId });
        this.loadAudits();
      },
      error: () => (this.error = 'Failed to add finding'),
    });
  }

  addSampling(): void {
    if (this.samplingForm.invalid) {
      this.error = 'Please fill required sampling fields';
      return;
    }
    this.auditService.addSampling(this.samplingForm.value).subscribe({
      next: () => {
        this.samplingForm.reset({ auditId: this.selectedAuditId });
        this.loadAudits();
      },
      error: () => (this.error = 'Failed to add sampling record'),
    });
  }

  selectSampling(samplingId: string): void {
    this.selectedSamplingId = samplingId;
    this.testResultForm.patchValue({ samplingId });
  }

  addTestResult(): void {
    if (this.testResultForm.invalid) {
      this.error = 'Please fill required test result fields';
      return;
    }
    let parameters: any = undefined;
    if (this.testResultForm.value.parametersJson) {
      try {
        parameters = JSON.parse(this.testResultForm.value.parametersJson);
      } catch (error) {
        this.error = 'Parameters must be valid JSON';
        return;
      }
    }
    const payload = {
      ...this.testResultForm.value,
      parameters,
    };
    delete payload.parametersJson;
    this.auditService.addTestResult(payload).subscribe({
      next: () => {
        this.testResultForm.reset({ samplingId: this.selectedSamplingId });
        this.loadAudits();
      },
      error: () => (this.error = 'Failed to add test result'),
    });
  }

  createLaboratory(): void {
    if (this.labForm.invalid) {
      this.error = 'Laboratory name is required';
      return;
    }
    this.auditService.createLaboratory(this.labForm.value).subscribe({
      next: () => {
        this.labForm.reset({ isAccredited: false });
        this.loadLaboratories();
      },
      error: () => (this.error = 'Failed to create laboratory'),
    });
  }

  onEvidenceFilesSelected(findingId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    this.pendingEvidenceFiles[findingId] = files;
  }

  onEvidenceDescriptionChange(findingId: string, value: string): void {
    this.evidenceDescriptions[findingId] = value;
  }

  uploadFindingEvidence(findingId: string): void {
    const files = this.pendingEvidenceFiles[findingId];
    if (!files || files.length === 0) {
      this.error = 'Please select evidence files to upload';
      return;
    }
    this.error = '';
    this.uploadingEvidence[findingId] = true;
    this.evidenceService
      .upload(EvidenceParentType.AUDIT_FINDING, findingId, files, this.evidenceDescriptions[findingId])
      .subscribe({
        next: () => {
          this.pendingEvidenceFiles[findingId] = [];
          this.loadEvidenceForFinding(findingId);
        },
        error: () => {
          this.error = 'Failed to upload evidence';
          this.uploadingEvidence[findingId] = false;
        },
        complete: () => (this.uploadingEvidence[findingId] = false),
      });
  }

  private loadEvidenceForAudit(auditId: string): void {
    const audit = this.audits.find((a) => a.id === auditId);
    audit?.findings?.forEach((finding) => this.loadEvidenceForFinding(finding.id));
  }

  private loadEvidenceForFinding(findingId: string): void {
    this.evidenceService.list(EvidenceParentType.AUDIT_FINDING, findingId).subscribe({
      next: (files) => (this.findingEvidence[findingId] = files || []),
    });
  }
}
