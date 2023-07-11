export type DocumentIntegrity = {
  doctypeTag: boolean;
  htmlTag: boolean;
  headTag: boolean;
  bodyTag: boolean;
};

/**
 * DocumentWrapper creates a document (its constituent parts: doctype,
 * head, body) from a few lines of HTML so as not to expect an unknown
 * result from the JSDOM parser conversion.
 */
export class DocumentWrapper {
  private readonly _documentIntegrity: DocumentIntegrity;

  public constructor(content: string) {
    this._content = content;
    this._documentIntegrity = {
      doctypeTag: this.contentHasTag("!DOCTYPE"),
      htmlTag: this.contentHasTag("html"),
      headTag: this.contentHasTag("head"),
      bodyTag: this.contentHasTag("body"),
    };
    this.addDoctype();
  }

  public get documentIntegrity(): DocumentIntegrity {
    return this._documentIntegrity;
  }

  private _doctype = "<!DOCTYPE html>";

  get doctype(): string {
    return this._doctype;
  }

  private _content: string;

  get content(): string {
    return this._content;
  }

  private contentHasTag(tag: string): boolean {
    return new RegExp(`<${tag}[\\s\\S]*?>`, "gmi").test(this._content);
  }

  /**
   * Cuts the tag from the content, and returns a string
   * with the tag and attributes without the content of the element.
   *
   * @param tag
   * @private
   */
  private contentCutTag(tag: string): string | undefined {
    this._content = this._content.replace(
      new RegExp(`<\\/${tag}[\\s\\S]*?>`),
      ""
    );

    const openTag = this._content.match(
      new RegExp(`<${tag}[\\s\\S]*?>`, "gmi")
    )?.[0];
    if (!openTag) return;

    this._content = this._content.replace(openTag, "");
    return openTag;
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
