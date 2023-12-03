import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//@ts-ignore
import * as B2 from 'backblaze-b2';
import { Types } from 'mongoose';

@Injectable()
export class B2Service {
  private readonly _logger: Logger = new Logger(B2Service.name);
  private b2: BackBlazeB2;
  private _bucketId: string;
  private _bucketName: string;
  private _uploadUrl: string;
  private _authorizationToken: string;

  constructor(private readonly configService: ConfigService) {
    this.b2 = new B2({
      applicationKeyId: this.configService.get('B2_APP_KEY_ID'),
      applicationKey: this.configService.get('B2_APP_KEY'),
      retry: {
        retries: 0,
      },
    });

    this._bucketId = this.configService.get('B2_BUCKET_ID');
    this._bucketName = this.configService.get('B2_BUCKET_NAME');

    this.authorize();
  }

  private async authorize() {
    try {
      await this.b2.authorize();
      const [authToken, uploadUrl] = await this.getUploadUrlAndToken();

      this._authorizationToken = authToken;
      this._uploadUrl = uploadUrl;
    } catch (error) {
      this._logger.log(error?.message);
    }
  }

  private async getUploadUrlAndToken(): Promise<[string, string]> {
    const response = await this.b2.getUploadUrl({ bucketId: this._bucketId });

    const uploadUrl = response.data.uploadUrl;
    const authorizationToken = response.data.authorizationToken;

    return [authorizationToken, uploadUrl];
  }

  private getFileUrl(filename?: string) {
    return `https://f005.backblazeb2.com/file/${this._bucketName}/${filename}`;
  }

  async uploadFile(userId: Types.ObjectId, file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${userId}/avatar`;
      await this.b2.uploadFile({
        uploadUrl: this._uploadUrl,
        fileName,
        data: file.buffer,
        uploadAuthToken: this._authorizationToken,
      });

      return this.getFileUrl(fileName);
    } catch (error) {
      this._logger.error('Error uploading: ', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
