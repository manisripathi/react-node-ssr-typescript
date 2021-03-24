import * as express from 'express';
import CommonRoutesConfig from '../../common/common.routes.config';
import handleRender from '../../helpers/renderHandler.helper';
import fetchUsersData from '../../store/api/users.api';

class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route('/users')
      .get((req: express.Request, res: express.Response) => {
        fetchUsersData((status, response) => {
          if (status === 'error') {
            return res
              .status(400)
              .send(response);
          }
          return res
            .status(200)
            .send(handleRender(response));
        });
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('Post to users');
      });

    return this.app;
  }
}

export default UsersRoutes;
