export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class PaginatedResponseBuilder {
  static build<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message = 'Data retrieved successfully',
  ): PaginatedResponse<T> {
    return {
      success: true,
      message,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
