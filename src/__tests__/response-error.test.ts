import { ResponseError } from '../response-error';

test('ResponseError', () => {
  let response = ResponseError.fromAny({ error: 'error' });
  expect(response).not.toBeNull();
  expect(response ? response.error : '').toBe('error');

  response = ResponseError.fromAny({ unknown: 100 });
  expect(response).toBeNull();
});
