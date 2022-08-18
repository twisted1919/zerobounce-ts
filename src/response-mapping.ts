import { ResponseSuccess } from './response-success';
import { ResponseError } from './response-error';

export type ResponseMappingSetter<T extends ResponseSuccess | ResponseError> = (s: any, d: T) => void;

export class ResponseMapping<T extends ResponseSuccess | ResponseError> {
  constructor(public field: string, public setter: ResponseMappingSetter<T>) {}
}

export const fromAnyWithMapping = <T extends ResponseSuccess | ResponseError>(
  object: any,
  result: T,
  mapping: ResponseMapping<T>[],
): T | null => {
  if (typeof object !== 'object') {
    return null;
  }

  let counter = 0;
  for (const map of mapping) {
    if (!object.hasOwnProperty(map.field)) {
      continue;
    }
    map.setter(object, result);
    counter++;
  }

  if (counter === 0) {
    return null;
  }

  return result;
};
