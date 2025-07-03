// common/validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private readonly logger = new Logger(JoiValidationPipe.name);

  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value); // ✅ Use schema's internal options

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      this.logger.warn(`Validation failed: ${messages}`);
      this.logger.debug(`Invalid payload: ${JSON.stringify(value)}`);
      throw new BadRequestException(messages);
    }

    this.logger.debug(`Validation passed: ${JSON.stringify(validatedValue)}`);
    return validatedValue;
  }
}
