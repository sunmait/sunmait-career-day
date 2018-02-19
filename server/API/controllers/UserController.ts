import * as express from 'express';
import {
  controller,
  httpGet,
  interfaces,
  response,
  requestParam,
} from 'inversify-express-utils';

/**
 * Operations about users.
 */
@controller('/api/users')
export class UserController implements interfaces.Controller {
  /**
   * Get employees
   * id: unit manager id
   */
  @httpGet('/employees')
  private async get(
    @requestParam('id') id: string,
    @response() res: express.Response,
  ): Promise<void> {
    res.json([
      {
        id: 1,
        Roles: 'employee',
        LastName: 'Pupkin',
        FirstName: 'Vasya',
        PhotoUrl: 'https://vk.com/images/camera_200.png',
        AccessToken: 'token',
      },
      {
        id: 2,
        Roles: 3,
        LastName: 'Pupkin',
        FirstName: 'Petya',
        PhotoUrl: 'https://vk.com/images/camera_200.png',
        AccessToken: 'token',
      },
      {
        id: 3,
        Roles: 'employee',
        LastName: 'Tsvirko',
        FirstName: 'Alexandra',
        PhotoUrl:
          'https://pp.userapi.com/c836738/v836738191/6de55/3wEYIHussZI.jpg',
        AccessToken: 'token',
      },
    ]);
  }
}
