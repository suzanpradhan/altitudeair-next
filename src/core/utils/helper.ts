import parse from "html-react-parser";

export function dateFromSqlDateTime(date = "") {
  return date.split("T")[0];
}

export function parseHtml(htmlString: string) {
  // TODO: Fix issue with commented code
  // const cleanHtmlString = DOMPurify.sanitize(htmlString, {
  //   USE_PROFILES: { html: true },
  // });
  return parse(htmlString);
}
