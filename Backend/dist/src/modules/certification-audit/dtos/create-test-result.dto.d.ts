import { TestResultStatus } from '../../../shared/enums';
export declare class CreateTestResultDto {
    samplingId: string;
    laboratoryId?: string;
    parameters?: Record<string, any>;
    reportFilePath?: string;
    resultStatus: TestResultStatus;
    testedAt?: string;
}
