import * as express from 'express';
import * as http from 'http';
import * as cookieParser from 'cookie-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as debug from 'debug';
import * as cors from 'cors';
import * as path from 'path';
import CommonRoutesConfig from './common/common.routes.config';
import UsersRoutes from './routes/users/users.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8080;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressWinston.logger(loggerOptions));
app.use(cookieParser());
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

if (process.env.DEBUG) {
  process.on('unhandledRejection', (reason) => {
    debugLog('Unhandled Rejection:', reason);
    process.exit(1);
  });
} else {
  loggerOptions.meta = false; // when not debugging, make terse
}

routes.push(new UsersRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server running at http://localhost:${port}`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
