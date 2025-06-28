// common/validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private readonly logger = new Logger(JoiValidationPipe.name);

  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    
    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      
      // Log the validation error
      this.logger.warn(`Validation failed: ${messages}`);
      this.logger.debug(`Invalid payload: ${JSON.stringify(value)}`);

      throw new BadRequestException(messages);
    }

    // Optionally log the success
    this.logger.debug(`Validation passed: ${JSON.stringify(value)}`);
    return value;
  }
}
