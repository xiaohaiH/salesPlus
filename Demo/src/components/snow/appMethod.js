export const trim = (str) => {
  str = str.replace(/^(\s+)/, '').replace(/(\s)$/g, '');
  return str
}