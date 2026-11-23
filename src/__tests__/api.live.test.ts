import { Api } from '../api';
import { CreditsResponseSuccess } from '../credits';
import { ValidateResponseSuccess, ValidateResponseSuccessStatus } from '../validate';

const apiKey = process.env.ZEROBOUNCE_API_KEY?.trim() || '';
const liveTest = apiKey ? test : test.skip;
const api = new Api(apiKey);

liveTest('Api.getCredits', async () => {
  const result = await api.getCredits();
  expect(result.error).toBe(null);
  expect(result.success).not.toBe(null);
  expect(result.isError()).toBe(false);
  expect(result.isSuccess()).toBe(true);
  expect(result.success).toBeInstanceOf(CreditsResponseSuccess);
  expect(result.success?.credits).toBeGreaterThanOrEqual(0);
});

liveTest('Api.validate', async () => {
  const emailQuery = [
    { email: 'valid@example.com', expected_status: ValidateResponseSuccessStatus.Valid },
    { email: 'invalid@example.com', expected_status: ValidateResponseSuccessStatus.Invalid },
    { email: 'catch_all@example.com', expected_status: ValidateResponseSuccessStatus.CatchAll },
    { email: 'unknown@example.com', expected_status: ValidateResponseSuccessStatus.Unknown },
    { email: 'spamtrap@example.com', expected_status: ValidateResponseSuccessStatus.Spamtrap },
    { email: 'abuse@example.com', expected_status: ValidateResponseSuccessStatus.Abuse },
    { email: 'do_not_mail@example.com', expected_status: ValidateResponseSuccessStatus.DoNotMail },
  ];

  for (let i in emailQuery) {
    const email = emailQuery[i];
    const result = await api.validate(email.email);
    expect(result.error).toBe(null);
    expect(result.success).not.toBe(null);
    expect(result.isError()).toBe(false);
    expect(result.isSuccess()).toBe(true);
    expect(result.success).toBeInstanceOf(ValidateResponseSuccess);
    expect(result?.success?.status).toBe(email.expected_status);
  }
});

liveTest('Api.validateWithIP', async () => {
  const result = await api.validate('valid@example.com', '127.0.0.1');
  expect(result.error).toBe(null);
  expect(result.success).not.toBe(null);
  expect(result.isError()).toBe(false);
  expect(result.isSuccess()).toBe(true);
  expect(result.success).toBeInstanceOf(ValidateResponseSuccess);
  expect(result?.success?.status).toBe(ValidateResponseSuccessStatus.Valid);
});
