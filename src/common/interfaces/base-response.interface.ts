export interface BaseResponseInterface {
  /**
   * HTTP status code indicating the outcome of the operation.
   */
  statusCode: number;

  /**
   * Message providing additional context about the operation.
   */
  message: string;
}
