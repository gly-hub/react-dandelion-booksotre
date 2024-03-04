import { useRoutes } from 'react-router-dom';

import { fullRoutes } from './routes';

const Router = () => {
  return useRoutes(fullRoutes);
};
export default Router;
