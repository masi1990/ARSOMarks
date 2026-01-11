import { Repository } from 'typeorm';
import { AcapScheme } from '../../reference-data/entities/acap-scheme.entity';
import { AccreditationBody } from '../../reference-data/entities/accreditation-body.entity';
export declare class LicensingLookupController {
    private readonly acapRepo;
    private readonly accreditationRepo;
    constructor(acapRepo: Repository<AcapScheme>, accreditationRepo: Repository<AccreditationBody>);
    getAcapSchemes(): Promise<AcapScheme[]>;
    getAccreditationBodies(): Promise<AccreditationBody[]>;
}
