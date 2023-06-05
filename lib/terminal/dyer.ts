export class Dyer {
  public static str(str: string, underline?: boolean): string {
    return underline ? Dyer.addUnderlineToStr(str) : str;
  }

  public static strToBlack(str: string, underline?: boolean): string {
    const string = `\x1b[30m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToRed(str: string, underline?: boolean): string {
    const string = `\x1b[31m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToGreen(str: string, underline?: boolean): string {
    const string = `\x1b[32m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToYellow(str: string, underline?: boolean): string {
    const string = `\x1b[33m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToBlue(str: string, underline?: boolean): string {
    const string = `\x1b[34m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToMagenta(str: string, underline?: boolean): string {
    const string = `\x1b[35m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToCyan(str: string, underline?: boolean): string {
    const string = `\x1b[36m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  public static strToWhite(str: string, underline?: boolean): string {
    const string = `\x1b[37m${str}\x1b[0m`;
    return underline ? Dyer.addUnderlineToStr(string) : string;
  }

  private static addUnderlineToStr(str: string): string {
    return `\x1b[4m${str}\x1b[0m`;
  }
}
