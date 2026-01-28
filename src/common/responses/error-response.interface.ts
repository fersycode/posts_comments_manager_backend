export interface ErrorResponse {
  success: false;
  message: string;
  status: number;
  timestamp: string;
  path?: string;
  errors?: any[];
}

export class ErrorResponseBuilder {
  static build(
    message: string,
    status: number,
    path?: string,
    errors?: any[],
  ): ErrorResponse {
    return {
      success: false,
      message,
      status,
      timestamp: new Date().toISOString(),
      path,
      errors,
    };
  }
}
