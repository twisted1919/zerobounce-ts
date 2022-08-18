import { CreditsResponseSuccess } from './credits';
import { ValidateResponseSuccess } from './validate';
import { ResponseType } from './response-type';
import { ResponseError } from './response-error';
import axios from 'axios';

export const API_URL = 'https://api.zerobounce.net/v2';

export class Api {
  private apiURL: string = API_URL;

  constructor(private apiKey: string) {}

  public setApiURL(url: string): Api {
    this.apiURL = url;
    return this;
  }

  public getApiURL(): string {
    return this.apiURL;
  }

  public setApiKey(url: string): Api {
    this.apiKey = url;
    return this;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public async getCredits(): Promise<ResponseType<CreditsResponseSuccess>> {
    const url = `${this.getApiURL()}/getcredits?api_key=${this.getApiKey()}`;

    const response = await axios.get(url, {
      responseType: 'json',
    });

    if (response.status !== 200) {
      throw new Error('Unexpected status code from the server');
    }

    const responseJSON = response.data;

    const success = CreditsResponseSuccess.fromAny(responseJSON);
    if (success !== null) {
      const resp = new ResponseType<CreditsResponseSuccess>();
      resp.success = success;
      return resp;
    }

    const error = ResponseError.fromAny(responseJSON);
    if (error !== null) {
      const resp = new ResponseType<CreditsResponseSuccess>();
      resp.error = error;
      return resp;
    }

    throw new Error('Unable to decode the response from the server');
  }

  public async validate(email: string, ipAddress?: string): Promise<ResponseType<ValidateResponseSuccess>> {
    let url = `${this.getApiURL()}/validate?api_key=${this.getApiKey()}&email=${email}`;
    if (ipAddress) {
      url = `${url}&ip_address=${ipAddress}`;
    }

    const response = await axios.get(url, {
      responseType: 'json',
    });

    if (response.status !== 200) {
      throw new Error('Unexpected status code from the server');
    }

    const responseJSON = response.data;

    const success = ValidateResponseSuccess.fromAny(responseJSON);
    if (success !== null) {
      const resp = new ResponseType<ValidateResponseSuccess>();
      resp.success = success;
      return resp;
    }

    const error = ResponseError.fromAny(responseJSON);
    if (error !== null) {
      const resp = new ResponseType<ValidateResponseSuccess>();
      resp.error = error;
      return resp;
    }

    throw new Error('Unable to decode the response from the server');
  }
}
