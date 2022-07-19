import React, {ReactElement, Suspense} from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import routes from './routes';

export default (): ReactElement => (
  <Router>
    <Routes>
      {routes.map((route, i) => {
        return route.fallback ? (
          <Route
            key={i}
            path={route.path}
            element={
              <Suspense fallback={route.fallback}>
                {route.component}
              </Suspense>
            }
          />
        ) : (
          <Route
            key={i}
            path={route.path}
            element={route.component}
          />
        )
      })}
    </Routes>
  </Router>
);
