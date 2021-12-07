export function replaceURLWithHTMLLinks(text) {
  var exp =
    // eslint-disable-next-line no-useless-escape
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}
