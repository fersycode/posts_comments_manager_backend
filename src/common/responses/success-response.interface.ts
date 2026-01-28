export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export class SuccessResponseBuilder {
  static build<T>(
    data: T,
    message = 'Operation successful',
  ): SuccessResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }
}
