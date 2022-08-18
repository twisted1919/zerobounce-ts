import { ValidateResponseSuccess, ValidateResponseSuccessStatus } from '../validate';

test('ValidateResponseSuccess.fromAny', () => {
  let response = ValidateResponseSuccess.fromAny({ status: 'valid' });
  expect(response).not.toBeNull();
  expect(response ? response.status : '').toBe(ValidateResponseSuccessStatus.Valid);

  response = ValidateResponseSuccess.fromAny({ unknown: 'valid' });
  expect(response).toBeNull();
});

test('ValidateResponseSuccess.statusIs', () => {
  for (const key of Object.keys(ValidateResponseSuccessStatus)) {
    const method = `is${key}`;
    let response = ValidateResponseSuccess.fromAny({
      // @ts-ignore
      status: ValidateResponseSuccessStatus[key],
    });
    // @ts-ignore
    expect(response ? response[method]() : false).toBe(true);
  }
});
