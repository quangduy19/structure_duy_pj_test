export function changeCase(obj: any, type: "snakeCase" | "cammelCase"): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => changeCase(item, type));
  } else if (typeof obj === "object" && obj !== null) {
    const caseObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const caseKey =
          type === "snakeCase"
            ? key.replace(/([A-Z])/g, "_$1").toLowerCase()
            : key.replace(/_./g, (match) => match.charAt(1).toUpperCase());
        caseObj[caseKey] = changeCase(obj[key], type);
      }
    }
    return caseObj;
  }
  return obj;
}

export function snakeToCamel(obj: any): any {
  return changeCase(obj, "cammelCase");
}

export function cameltoSnake(obj: any): any {
  return changeCase(obj, "snakeCase");
}
