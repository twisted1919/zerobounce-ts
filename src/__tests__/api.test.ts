import axios from 'axios';
import { Api, API_URL } from '../api';

jest.mock('axios');
const get = jest.mocked(axios.get);

beforeEach(() => {
  get.mockReset();
});

test('Api.apiKey', () => {
  const api = new Api('initial-key');
  expect(api.getApiKey()).toBe('initial-key');

  api.setApiKey('test');
  expect(api.getApiKey()).toBe('test');
});

test('Api.apiURL', () => {
  const api = new Api('test-key');
  expect(api.getApiURL()).toBe(API_URL);

  api.setApiURL('https://example.com');
  expect(api.getApiURL()).toBe('https://example.com');
});

test('Api.getCredits returns a zero balance', async () => {
  get.mockResolvedValueOnce({ status: 200, data: { Credits: '0' } });

  const result = await new Api('test-key').getCredits();

  expect(get).toHaveBeenCalledWith(`${API_URL}/getcredits?api_key=test-key`, { responseType: 'json' });
  expect(result.success?.credits).toBe(0);
});

test.each([
  { ip: undefined, query: '' },
  { ip: '127.0.0.1', query: '&ip_address=127.0.0.1' },
])('Api.validate sends the expected request for IP $ip', async ({ ip, query }) => {
  get.mockResolvedValueOnce({ status: 200, data: { address: 'valid@example.com', status: 'valid' } });

  const result = await new Api('test-key').validate('valid@example.com', ip);

  expect(get).toHaveBeenCalledWith(`${API_URL}/validate?api_key=test-key&email=valid@example.com${query}`, {
    responseType: 'json',
  });
  expect(result.success?.address).toBe('valid@example.com');
  expect(result.success?.status).toBe('valid');
});
