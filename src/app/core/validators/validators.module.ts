import { NgModule } from '@angular/core';

import { EqualValidator } from './equal/directive';
import { DigitsValidator } from './digits/directive';
import { MaxDateValidator } from './max-date/directive';
import { DateISOValidator } from './date-ios/directive';
import { GreaterThanEqualValidator } from './greater-than-equal/directive';
import { NumberValidator } from './number/directive';
import { EqualToValidator } from './equal-to/directive';
import { MinValidator } from './min/directive';
import { LessThanValidator } from './less-than/directive';
import { NotEqualToValidator } from './not-equal-to/directive';
import { MinDateValidator } from './min-date/directive';
import { JSONValidator } from './json/directive';
import { UUIDValidator } from './uuid/directive';
import { MaxValidator } from './max/directive';
import { Base64Validator } from './base64/directive';
import { GreaterThanValidator } from './greater-than/directive';
import { RangeValidator } from './range/directive';
import { CreditCardValidator } from './credit-card/directive';
import { NotEqualValidator } from './not-equal/directive';
import { PhoneValidator } from './phone/directive';
import { DateValidator } from './date/directive';
import { LessThanEqualValidator } from './less-than-equal/directive';
import { RangeLengthValidator } from './range-length/directive';
import { UrlValidator } from './url/directive';
import { EmailValidator } from './email/directive';

const CUSTOM_VALIDATORS_DIRECTIVES = [
  Base64Validator,
  CreditCardValidator,
  DateValidator,
  DateISOValidator,
  DigitsValidator,
  EmailValidator,
  EqualValidator,
  EqualToValidator,
  GreaterThanValidator,
  GreaterThanEqualValidator,
  JSONValidator,
  LessThanValidator,
  LessThanEqualValidator,
  MaxValidator,
  MaxDateValidator,
  MinValidator,
  MinDateValidator,
  NotEqualValidator,
  NotEqualToValidator,
  NumberValidator,
  PhoneValidator,
  RangeValidator,
  RangeLengthValidator,
  UrlValidator,
  UUIDValidator
];

@NgModule({
  declarations: [CUSTOM_VALIDATORS_DIRECTIVES],
  exports: [CUSTOM_VALIDATORS_DIRECTIVES]
})
export class CustomValidatorsModule { }
