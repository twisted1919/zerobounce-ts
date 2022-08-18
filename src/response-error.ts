import { fromAnyWithMapping } from './response-mapping';

export class ResponseError {
  constructor(public error: string = '') {}

  public static fromAny(object: any): ResponseError | null {
    return fromAnyWithMapping(object, new ResponseError(), [
      {
        field: 'error',
        setter: (s: any, d: ResponseError): void => {
          d.error = String(s.error ?? '');
        },
      },
    ]);
  }
}
