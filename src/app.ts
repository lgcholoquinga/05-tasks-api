import config from './config/config';
import app from './server/server';

const PORT = config.port;

app.listen(PORT, () => {
   console.log(`Server is running on port: ${PORT}`);
});