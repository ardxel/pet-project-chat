import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ObjectIdValidationPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId = Types.ObjectId.createFromHexString(value);
    return objectId;
  }
}
