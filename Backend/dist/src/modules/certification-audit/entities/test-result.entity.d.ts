import { TestResultStatus } from '../../../shared/enums';
import { SamplingRecord } from './sampling-record.entity';
import { Laboratory } from './laboratory.entity';
export declare class TestResult {
    id: string;
    samplingId: string;
    sampling?: SamplingRecord;
    laboratoryId?: string;
    laboratory?: Laboratory;
    parameters?: Record<string, any>;
    reportFilePath?: string;
    resultStatus: TestResultStatus;
    testedAt?: string;
    createdAt: Date;
    updatedAt: Date;
}
