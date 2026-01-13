import { MarkLicenseAsset } from './mark-license-asset.entity';
import { SystemUser } from '../../system-user/system-user.entity';
export declare class MarkLicenseAssetDownload {
    id: string;
    assetId: string;
    asset: MarkLicenseAsset;
    filePath: string;
    downloadedBy?: string;
    downloadedByUser?: SystemUser;
    downloadedAt: Date;
    ipAddress?: string;
    userAgent?: string;
}
