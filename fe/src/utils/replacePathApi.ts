export function replacePathApi(
  path: string,
  obj: Record<string, string | number>
): string {
  let _path = path;
  Object.keys(obj).forEach((key) => {
    _path = _path.replace(`:${key}`, `${obj[key]}`);
  });

  return _path;
}
