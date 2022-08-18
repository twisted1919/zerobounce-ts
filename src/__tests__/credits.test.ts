import { CreditsResponseSuccess } from '../credits';

test('CreditsResponseSuccess.fromAny', () => {
  let response = CreditsResponseSuccess.fromAny({ Credits: 100 });
  expect(response).not.toBeNull();
  expect(response ? response.credits : -1).toBe(100);

  response = CreditsResponseSuccess.fromAny({ unknown: 100 });
  expect(response).toBeNull();
});
