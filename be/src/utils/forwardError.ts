export const forwardError = function (callback: any) {
  return async function (req: any, res: any, next: any) {
    try {
      return await callback(req, res);
    } catch (error) {
      next(error);
    }
  };
};
