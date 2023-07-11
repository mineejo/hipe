export type DocumentIntegrity = {
  doctypeTag: boolean;
  htmlTag: boolean;
  headTag: boolean;
  bodyTag: boolean;
};

export class Document {
  protected readonly _documentIntegrity: DocumentIntegrity;

  public constructor(content: string) {
    this._content = content;
    this._documentIntegrity = {
      doctypeTag: this.contentHasTag("!DOCTYPE"),
      htmlTag: this.contentHasTag("html"),
      headTag: this.contentHasTag("head"),
      bodyTag: this.contentHasTag("body"),
    };
  }

  public get documentIntegrity(): DocumentIntegrity {
    return this._documentIntegrity;
  }

  protected _content: string;

  public get content(): string {
    return this._content;
  }

  protected contentHasTag(tag: string): boolean {
    return new RegExp(`<${tag}[\\s\\S]*?>`, "gmi").test(this._content);
  }

  /**
   * Cuts the tag from the content, and returns a string
   * with the tag and attributes without the content of the element.
   *
   * @param tag
   * @private
   */
  protected contentCutTag(tag: string): string | undefined {
    this._content = this._content.replace(
      new RegExp(`<\\/${tag}[\\s\\S]*?>`),
      "",
    );

    const openTag = this._content.match(
      new RegExp(`<${tag}[\\s\\S]*?>`, "gmi"),
    )?.[0];
    if (!openTag) return;

    this._content = this._content.replace(openTag, "");
    return openTag;
  }
}
