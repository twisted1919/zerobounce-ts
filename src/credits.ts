import { fromAnyWithMapping } from './response-mapping';

export class CreditsResponseSuccess {
  public credits: number = 0;

  public static fromAny(object: any): CreditsResponseSuccess | null {
    return fromAnyWithMapping(object, new CreditsResponseSuccess(), [
      {
        field: 'Credits',
        setter: (s: any, d: CreditsResponseSuccess): void => {
          d.credits = Number(s.Credits ?? 0);
        },
      },
    ]);
  }
}
