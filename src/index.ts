import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

validateEnv();
const app = new App();

app.initialiseMiddleware();
app.initialiseControllers();
app.initialiseErrorHandling();

app.initialiseDatabaseConnection();

app.listen();