import { ResponseType } from '../response-type';
import { ValidateResponseSuccess } from '../validate';
import { ResponseError } from '../response-error';

test('ResponseType.isSuccess', () => {
  const response = new ResponseType();
  response.success = new ValidateResponseSuccess();
  expect(response.isSuccess()).toBe(true);
  expect(response.isError()).toBe(false);
});

test('ResponseType.isError', () => {
  const response = new ResponseType();
  response.error = new ResponseError('error');
  expect(response.isError()).toBe(true);
  expect(response.isSuccess()).toBe(false);
});
