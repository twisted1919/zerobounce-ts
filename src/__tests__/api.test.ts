import { Api, API_URL } from '../api';
import { CreditsResponseSuccess } from '../credits';
import { ValidateResponseSuccess, ValidateResponseSuccessStatus } from '../validate';

test('Api.apiKey', () => {
  const api = new Api(process.env.ZEROBOUNCE_API_KEY || '');

  expect(api.getApiKey()).toBe(process.env.ZEROBOUNCE_API_KEY || '');

  api.setApiKey('test');
  expect(api.getApiKey()).toBe('test');
});

test('Api.apiURL', () => {
  const api = new Api(process.env.ZEROBOUNCE_API_KEY || '');

  expect(api.getApiURL()).toBe(API_URL);

  api.setApiURL('https://example.com');
  expect(api.getApiURL()).toBe('https://example.com');
});

test('Api.getCredits', async () => {
  const api = new Api(process.env.ZEROBOUNCE_API_KEY || '');

  const result = await api.getCredits();
  expect(result.error).toBe(null);
  expect(result.success).not.toBe(null);
  expect(result.isError()).toBe(false);
  expect(result.isSuccess()).toBe(true);
  expect(result.success).toBeInstanceOf(CreditsResponseSuccess);
  expect(result?.success?.credits ? Number(result.success.credits) : -1).toBeGreaterThanOrEqual(0);
});

test('Api.validate', async () => {
  const api = new Api(process.env.ZEROBOUNCE_API_KEY || '');

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

test('Api.validateWithIP', async () => {
  const api = new Api(process.env.ZEROBOUNCE_API_KEY || '');

  const result = await api.validate('valid@example.com', '127.0.0.1');
  expect(result.error).toBe(null);
  expect(result.success).not.toBe(null);
  expect(result.isError()).toBe(false);
  expect(result.isSuccess()).toBe(true);
  expect(result.success).toBeInstanceOf(ValidateResponseSuccess);
  expect(result?.success?.status).toBe(ValidateResponseSuccessStatus.Valid);
});
