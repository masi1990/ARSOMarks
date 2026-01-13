import { DataSource, Repository } from 'typeorm';
import { MarkLicenseAsset } from '../entities/mark-license-asset.entity';
import { MarkLicenseAssetDownload } from '../entities/mark-license-asset-download.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { RequestAssetsDto } from '../dtos';
export declare class MarkAssetService {
    private readonly assetRepository;
    private readonly downloadRepository;
    private readonly agreementRepository;
    private readonly dataSource;
    constructor(assetRepository: Repository<MarkLicenseAsset>, downloadRepository: Repository<MarkLicenseAssetDownload>, agreementRepository: Repository<MarkLicenseAgreement>, dataSource: DataSource);
    requestAssets(requestDto: RequestAssetsDto, userId: string): Promise<MarkLicenseAsset>;
    deliverAssets(assetId: string, assetFiles: any[], userId: string): Promise<MarkLicenseAsset>;
    trackDownload(assetId: string, filePath: string, userId: string, ipAddress?: string, userAgent?: string): Promise<MarkLicenseAssetDownload>;
    findById(id: string): Promise<MarkLicenseAsset>;
    getAssetLibrary(agreementId: string): Promise<MarkLicenseAsset[]>;
    getDownloadHistory(assetId: string): Promise<MarkLicenseAssetDownload[]>;
}
