import { fromAnyWithMapping } from './response-mapping';

export enum ValidateResponseSuccessStatus {
  Valid = 'valid',
  Invalid = 'invalid',
  CatchAll = 'catch-all',
  Unknown = 'unknown',
  Spamtrap = 'spamtrap',
  Abuse = 'abuse',
  DoNotMail = 'do_not_mail',
}

export class ValidateResponseSuccess {
  // The email address you are validating.
  public address: string = '';
  // [valid, invalid, catch-all, unknown, spamtrap, abuse, do_not_mail]
  public status: ValidateResponseSuccessStatus = ValidateResponseSuccessStatus.Unknown;
  // [antispam_system, greylisted, mail_server_temporary_error, forcible_disconnect, mail_server_did_not_respond, timeout_exceeded, failed_smtp_connection, mailbox_quota_exceeded, exception_occurred, possible_trap, role_based, global_suppression, mailbox_not_found, no_dns_entries, failed_syntax_check, possible_typo, unroutable_ip_address, leading_period_removed, does_not_accept_mail, alias_address, role_based_catch_all, disposable, toxic]
  public subStatus: string = '';
  // [true/false] If the email comes from a free provider.
  public freeEmail: boolean = false;
  // Suggestive Fix for an email typo
  public didYouMean: string | null = null;
  // The portion of the email address before the "@" symbol or null.
  public account: string | null = null;
  // The portion of the email address after the "@" symbol or null.
  public domain: string | null = null;
  // Age of the email domain in days or [null].
  public domainAgeDays: string | null = null;
  // The SMTP Provider of the email or [null] [BETA].
  public smtpProvider: string | null = null;
  // The preferred MX record of the domain
  public mxRecord: string | null = null;
  // [true/false] Does the domain have an MX record. [they return "bool" not bool, which makes it a string...]
  public mxFound: string | null = null;
  // The first name of the owner of the email when available or [null].
  public firstName: string | null = null;
  // The last name of the owner of the email when available or [null].
  public lastName: string | null = null;
  // The gender of the owner of the email when available or [null].
  public gender: string | null = null;
  // The country of the IP passed in or [null]
  public country: string | null = null;
  // The region/state of the IP passed in or [null]
  public region: string | null = null;
  // The city of the IP passed in or [null]
  public city: string | null = null;
  // The zipcode of the IP passed in or [null]
  public zipcode: string | null = null;
  // The UTC time the email was validated.
  public processedAt: string = '';

  public isValid(): boolean {
    return this.status === ValidateResponseSuccessStatus.Valid;
  }

  public isInvalid(): boolean {
    return this.status === ValidateResponseSuccessStatus.Invalid;
  }

  public isCatchAll(): boolean {
    return this.status === ValidateResponseSuccessStatus.CatchAll;
  }

  public isUnknown(): boolean {
    return this.status === ValidateResponseSuccessStatus.Unknown;
  }

  public isSpamtrap(): boolean {
    return this.status === ValidateResponseSuccessStatus.Spamtrap;
  }

  public isAbuse(): boolean {
    return this.status === ValidateResponseSuccessStatus.Abuse;
  }

  public isDoNotMail(): boolean {
    return this.status === ValidateResponseSuccessStatus.DoNotMail;
  }

  public static fromAny(object: any): ValidateResponseSuccess | null {
    return fromAnyWithMapping(object, new ValidateResponseSuccess(), [
      {
        field: 'address',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.address = String(s?.address ?? '');
        },
      },
      {
        field: 'status',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.status = (s?.status ?? ValidateResponseSuccessStatus.Unknown) as ValidateResponseSuccessStatus;
        },
      },
      {
        field: 'sub_status',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.subStatus = String(s?.sub_status);
        },
      },
      {
        field: 'free_email',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.freeEmail = Boolean(s?.free_email);
        },
      },
      {
        field: 'did_you_mean',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.didYouMean = s?.did_you_mean;
        },
      },
      {
        field: 'account',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.account = s?.account;
        },
      },
      {
        field: 'domain',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.domain = s?.domain;
        },
      },
      {
        field: 'domain_age_days',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.domainAgeDays = s?.domain_age_days;
        },
      },
      {
        field: 'smtp_provider',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.smtpProvider = s?.smtp_provider;
        },
      },
      {
        field: 'mx_record',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.mxRecord = s?.mx_record;
        },
      },
      {
        field: 'mx_found',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.mxFound = s?.mx_found;
        },
      },
      {
        field: 'firstname',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.firstName = s?.firstname;
        },
      },
      {
        field: 'lastname',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.lastName = s?.lastname;
        },
      },
      {
        field: 'gender',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.gender = s?.gender;
        },
      },
      {
        field: 'country',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.country = s?.country;
        },
      },
      {
        field: 'region',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.region = s?.region;
        },
      },
      {
        field: 'city',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.city = s?.city;
        },
      },
      {
        field: 'zipcode',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.zipcode = s?.zipcode;
        },
      },
      {
        field: 'processed_at',
        setter: (s: any, d: ValidateResponseSuccess): void => {
          d.processedAt = String(s?.processed_at ?? '');
        },
      },
    ]);
  }
}
