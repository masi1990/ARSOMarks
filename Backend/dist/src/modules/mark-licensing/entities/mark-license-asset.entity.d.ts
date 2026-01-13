import { MarkLicenseAgreement } from './mark-license-agreement.entity';
import { SystemUser } from '../../system-user/system-user.entity';
import { AssetDeliveryMethod } from '../../../shared/enums';
import { MarkLicenseAssetDownload } from './mark-license-asset-download.entity';
export declare class MarkLicenseAsset {
    id: string;
    agreementId: string;
    agreement: MarkLicenseAgreement;
    assetRequestDate: Date;
    requestedAssets: string[];
    assetDeliveryMethod: AssetDeliveryMethod;
    assetRecipientName: string;
    assetRecipientEmail: string;
    assetUseConfirmation: boolean;
    assetFiles?: Record<string, any>[];
    deliveredAt?: Date;
    deliveryMethodUsed?: AssetDeliveryMethod;
    downloadCount: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    createdByUser?: SystemUser;
    downloads?: MarkLicenseAssetDownload[];
}
