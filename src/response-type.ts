import { ResponseError } from './response-error';
import { ResponseSuccess } from './response-success';

export class ResponseType<T extends ResponseSuccess> {
  public success: T | null = null;
  public error: ResponseError | null = null;

  public isSuccess(): boolean {
    return Boolean(this.success && !this.error);
  }

  public isError(): boolean {
    return Boolean(this.error && !this.success);
  }
}
