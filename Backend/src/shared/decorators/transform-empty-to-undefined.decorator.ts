import { Transform } from 'class-transformer';

/**
 * Transforms empty strings and null values to undefined.
 * This is useful for optional fields that should skip validation when empty.
 * 
 * Usage:
 * @TransformEmptyToUndefined()
 * @IsOptional()
 * @IsString()
 * field?: string;
 */
export function TransformEmptyToUndefined() {
  return Transform(({ value }) => {
    if (value === '' || value === null) {
      return undefined;
    }
    return value;
  });
}

