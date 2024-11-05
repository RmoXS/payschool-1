import { BaseResponseInterface } from 'src/common/interfaces/base-response.interface';

/**
 * Data Transfer Object (DTO) representing a login response structure.
 */
export class LoginResponseDto implements BaseResponseInterface {
  /**
   * HTTP status code indicating the outcome of the operation.
   */
  statusCode: number;

  /**
   * Message providing additional context about the operation.
   */
  message: string;

  /**
   * Additional data returned by the operation.
   */
  data: {
    /**
     * User token used in the authentication process
     */
    token: string;
  };
}
