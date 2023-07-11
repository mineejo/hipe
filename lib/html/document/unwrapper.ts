import { Document, DocumentIntegrity } from "../document.js";

/**
 * Unwrapper removes the constituent parts of the document
 * (html, head, body tags) if they were only needed for the parser.
 */
export class Unwrapper extends Document {
  public constructor(content: string, documentIntegrity: DocumentIntegrity) {
    super(content);
    // Due to the nature of getting HTML from a document,
    // doctype is lost and returned in the Hipe class of the parser.
    if (!documentIntegrity.htmlTag) this.contentCutTag("html");
    if (!documentIntegrity.headTag) this.contentCutTag("head");
    if (!documentIntegrity.bodyTag) this.contentCutTag("body");
  }
}
