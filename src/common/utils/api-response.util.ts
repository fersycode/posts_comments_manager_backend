export class ApiResponse {
  static success(data: any, message = 'Operation successful') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, status = 400) {
    return {
      success: false,
      message,
      status,
    };
  }

  static created(data: any, message = 'Resource created successfully') {
    return {
      success: true,
      message,
      data,
    };
  }

  static deleted(message = 'Resource deleted successfully') {
    return {
      success: true,
      message,
      data: null,
    };
  }
}
