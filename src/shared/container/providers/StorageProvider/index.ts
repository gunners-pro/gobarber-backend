import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import AzureStorageBlobProvider from './implementations/AzureStorageBlobProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  azure: AzureStorageBlobProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
