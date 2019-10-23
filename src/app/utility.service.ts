import {Injectable} from "@angular/core";

@Injectable()
export class UtilityService {

  static formatStringLowercaseNoSpaces(input: string): string {
    return input.replace(/\s+/g, '').toLowerCase();
  }
}
