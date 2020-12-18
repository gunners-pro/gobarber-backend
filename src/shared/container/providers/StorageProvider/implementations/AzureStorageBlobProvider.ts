import fs from 'fs';
import path from 'path';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import uploadConfig from '@config/upload';
import mime from 'mime';
import IStorageProvider from '../models/IStorageProvider';

class AzureStorageBlobProvider implements IStorageProvider {
  private client: BlobServiceClient;

  constructor() {
    const storageSharedKeyCredential = new StorageSharedKeyCredential(
      uploadConfig.config.azure.accountName,
      process.env.AZURE_STORAGE_CONNECTION_STRING as string,
    );
    this.client = new BlobServiceClient(
      `https://${uploadConfig.config.azure.accountName}.blob.core.windows.net`,
      storageSharedKeyCredential,
    );
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(originalPath);
    if (!contentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const containerClient = this.client.getContainerClient('app-gobarber');

    const blockBlobClient = containerClient.getBlockBlobClient(file);
    await blockBlobClient.upload(fileContent, fileContent.length, {
      blobHTTPHeaders: { blobContentType: contentType },
    });

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const containerClient = this.client.getContainerClient('app-gobarber');
    const blockBlobClient = containerClient.getBlockBlobClient(file);
    await blockBlobClient.delete();
  }
}

export default AzureStorageBlobProvider;
