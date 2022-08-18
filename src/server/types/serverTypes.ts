interface CustomError extends Error {
  code: number;
  privatMessage: string;
  publicMessage: string;
}

export default CustomError;
