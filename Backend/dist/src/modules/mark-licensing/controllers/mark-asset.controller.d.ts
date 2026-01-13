import { MarkAssetService } from '../services/mark-asset.service';
import { RequestAssetsDto } from '../dtos';
import { SystemUser } from '../../system-user/system-user.entity';
import { Request } from 'express';
export declare class MarkAssetController {
    private readonly assetService;
    constructor(assetService: MarkAssetService);
    requestAssets(dto: RequestAssetsDto, user: SystemUser): Promise<import("../entities").MarkLicenseAsset>;
    deliverAssets(id: string, body: {
        assetFiles: any[];
    }, user: SystemUser): Promise<import("../entities").MarkLicenseAsset>;
    trackDownload(id: string, body: {
        filePath: string;
    }, user: SystemUser, req: Request): Promise<import("../entities").MarkLicenseAssetDownload>;
    getById(id: string): Promise<import("../entities").MarkLicenseAsset>;
    getAssetLibrary(agreementId: string): Promise<import("../entities").MarkLicenseAsset[]>;
    getDownloadHistory(id: string): Promise<import("../entities").MarkLicenseAssetDownload[]>;
}
