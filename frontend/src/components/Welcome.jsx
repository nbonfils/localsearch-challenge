import React from 'react';
// React Router
import { Link as RouterLink } from 'react-router-dom';

const Welcome = () => (
  <div>
    Welcome
    <RouterLink to="/test">test</RouterLink>
  </div>
);

export default Welcome;
