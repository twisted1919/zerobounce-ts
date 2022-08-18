import { fromAnyWithMapping, ResponseMapping } from '../response-mapping';
import { ValidateResponseSuccess } from '../validate';

test('ResponseMapping.fromAnyWithMapping', () => {
  const s: any = { first_name: 'john', last_name: 'doe', domain_age_days: '10' };
  const d = { firstName: '', lastName: '', domainAgeDays: '10' } as ValidateResponseSuccess;

  const mapping: ResponseMapping<ValidateResponseSuccess>[] = [
    {
      field: 'first_name',
      setter: (s: any, d: ValidateResponseSuccess): void => {
        d.firstName = s.first_name;
      },
    },
    {
      field: 'last_name',
      setter: (s: any, d: ValidateResponseSuccess): void => {
        d.lastName = s.last_name;
      },
    },
    {
      field: 'domain_age_days',
      setter: (s: any, d: ValidateResponseSuccess): void => {
        d.domainAgeDays = s.domain_age_days;
      },
    },
  ];

  const response = fromAnyWithMapping(s, d, mapping);
  expect(response?.firstName).toBe(s.first_name);
  expect(response?.lastName).toBe(s.last_name);
  expect(response?.domainAgeDays).toBe(s.domain_age_days);
});
