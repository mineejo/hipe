import { Document } from "../document.js";

/**
 * Wrapper creates a document (its constituent parts: doctype,
 * head, body) from a few lines of HTML so as not to expect an unknown
 * result from the JSDOM parser conversion.
 */
export class Wrapper extends Document {
  public constructor(content: string) {
    super(content);
    this.addDoctype();
  }

  private _doctype = "<!DOCTYPE html>";

  get doctype(): string {
    return this._doctype;
  }

  private addDoctype(): void {
    if (this._documentIntegrity.doctypeTag) {
      const doctypeTag: string | undefined = this.contentCutTag("!DOCTYPE");
      this.addHtml();
      this._content = doctypeTag + this._content;
      this._doctype = doctypeTag ?? this._doctype;
    } else {
      this.addHtml();
      this._content = "<!DOCTYPE html>" + this._content;
    }
  }

  private addHtml(): void {
    if (this._documentIntegrity.htmlTag) {
      const htmlTag: string | undefined = this.contentCutTag("html");
      this.addBody();
      this._content = htmlTag + this._content + "</html>";
    } else {
      this.addBody();
      this._content = "<html>" + this._content + "</html>";
    }
  }

  private addBody(): void {
    if (!this._documentIntegrity.headTag && this._documentIntegrity.bodyTag) {
      const bodyTag: string | undefined = this.contentCutTag("body");
      this._content = `${bodyTag}${this._content}</body>`;
    } else if (
      this._documentIntegrity.headTag &&
      !this._documentIntegrity.bodyTag
    ) {
      this.contentCutTag("head");
      this._content = `<body>${this._content}</body>`;
    } else if (
      !this._documentIntegrity.headTag &&
      !this._documentIntegrity.bodyTag
    ) {
      this._content = `<body>${this._content}</body>`;
    }
    this.addHead();
  }

  private addHead(): void {
    if (!this._documentIntegrity.headTag) {
      this._content = `<head></head>${this._content}`;
    }
  }
}
