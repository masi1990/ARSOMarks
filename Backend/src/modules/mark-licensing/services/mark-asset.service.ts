import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MarkLicenseAsset } from '../entities/mark-license-asset.entity';
import { MarkLicenseAssetDownload } from '../entities/mark-license-asset-download.entity';
import { MarkLicenseAgreement } from '../entities/mark-license-agreement.entity';
import { RequestAssetsDto } from '../dtos';
import { AssetDeliveryMethod, AgreementStatus } from '../../../shared/enums';

@Injectable()
export class MarkAssetService {
  constructor(
    @InjectRepository(MarkLicenseAsset)
    private readonly assetRepository: Repository<MarkLicenseAsset>,
    @InjectRepository(MarkLicenseAssetDownload)
    private readonly downloadRepository: Repository<MarkLicenseAssetDownload>,
    @InjectRepository(MarkLicenseAgreement)
    private readonly agreementRepository: Repository<MarkLicenseAgreement>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Request digital assets
   */
  async requestAssets(requestDto: RequestAssetsDto, userId: string): Promise<MarkLicenseAsset> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify agreement exists and is executed
      const agreement = await this.agreementRepository.findOne({
        where: { id: requestDto.agreementId },
      });

      if (!agreement) {
        throw new NotFoundException(`Agreement with ID ${requestDto.agreementId} not found`);
      }

      if (agreement.agreementStatus !== AgreementStatus.EXECUTED) {
        throw new BadRequestException('Agreement must be executed before requesting assets');
      }

      // Create asset request
      const asset = this.assetRepository.create({
        agreementId: requestDto.agreementId,
        requestedAssets: requestDto.requestedAssets,
        assetDeliveryMethod: requestDto.assetDeliveryMethod as AssetDeliveryMethod,
        assetRecipientName: requestDto.assetRecipientName,
        assetRecipientEmail: requestDto.assetRecipientEmail,
        assetUseConfirmation: requestDto.assetUseConfirmation,
        createdBy: userId,
      });

      const savedAsset = await queryRunner.manager.save(asset);
      await queryRunner.commitTransaction();

      return this.findById(savedAsset.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Deliver assets (mark as delivered)
   */
  async deliverAssets(assetId: string, assetFiles: any[], userId: string): Promise<MarkLicenseAsset> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    asset.assetFiles = assetFiles;
    asset.deliveredAt = new Date();
    asset.deliveryMethodUsed = asset.assetDeliveryMethod;
    asset.updatedAt = new Date();

    return this.assetRepository.save(asset);
  }

  /**
   * Track asset download
   */
  async trackDownload(
    assetId: string,
    filePath: string,
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<MarkLicenseAssetDownload> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    const download = this.downloadRepository.create({
      assetId,
      filePath,
      downloadedBy: userId,
      ipAddress,
      userAgent,
    });

    // Increment download count
    asset.downloadCount = (asset.downloadCount || 0) + 1;
    await this.assetRepository.save(asset);

    return this.downloadRepository.save(download);
  }

  /**
   * Get asset by ID
   */
  async findById(id: string): Promise<MarkLicenseAsset> {
    const asset = await this.assetRepository.findOne({
      where: { id },
      relations: ['agreement', 'downloads'],
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    return asset;
  }

  /**
   * Get asset library for an agreement
   */
  async getAssetLibrary(agreementId: string): Promise<MarkLicenseAsset[]> {
    return this.assetRepository.find({
      where: { agreementId },
      relations: ['downloads'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get download history for an asset
   */
  async getDownloadHistory(assetId: string): Promise<MarkLicenseAssetDownload[]> {
    return this.downloadRepository.find({
      where: { assetId },
      relations: ['downloadedByUser'],
      order: { downloadedAt: 'DESC' },
    });
  }
}

