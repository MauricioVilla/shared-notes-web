import { base64 } from './base64/validator';
import { creditCard } from './credit-card/validator';
import { date } from './date/validator';
import { dateISO } from './date-ios/validator';
import { digits } from './digits/validator';
import { email } from './email/validator';
import { equal } from './equal/validator';
import { equalTo } from './equal-to/validator';
import { gt } from './greater-than/validator';
import { gte } from './greater-than-equal/validator';
import { json } from './json/validator';
import { lt } from './less-than/validator';
import { lte } from './less-than-equal/validator';
import { max } from './max/validator';
import { maxDate } from './max-date/validator';
import { min } from './min/validator';
import { minDate } from './min-date/validator';
import { notEqual } from './not-equal/validator';
import { notEqualTo } from './not-equal-to/validator';
import { number } from './number/validator';
import { phone } from './phone/validator';
import { range } from './range/validator';
import { rangeLength } from './range-length/validator';
import { url } from './url/validator';
import { uuid } from './uuid/validator';

export const CustomValidators: any = {
  base64,
  creditCard,
  date,
  dateISO,
  digits,
  email,
  equal,
  equalTo,
  gt,
  gte,
  json,
  lt,
  lte,
  max,
  maxDate,
  min,
  minDate,
  notEqual,
  notEqualTo,
  number,
  phone,
  range,
  rangeLength,
  url,
  uuid
};

export { CustomValidatorsModule } from './validators.module';
