import React, { useEffect, Suspense } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';

// CUSTOM COMPONENT
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';

// CUSTOM CONTEXT & HOOK
import { AuthContext } from './shared/context/auth-context';
import { StockContext } from './shared/context/stock-context';
import { useAuth } from './shared/hooks/auth-hook';
import { useStock } from './shared/hooks/stock-hook';

// PAGES (UNAUTHORIZED)
const NewPasswordPage = React.lazy(() =>
  import('./auth/pages/NewPasswordPage')
);
const ResetPage = React.lazy(() => import('./auth/pages/ResetPage'));
const AuthPage = React.lazy(() => import('./auth/pages/AuthPage'));

// PAGES (AUTHORIZED)
const HomePage = React.lazy(() => import('./homePage/pages/HomePage'));

const App = (props: RouteComponentProps): JSX.Element => {
  const { token, login, logout, user, update } = useAuth();
  const { stocks, totalStocks, fetchRandomMultipleStocks } = useStock();

  useEffect(() => {
    token && fetchRandomMultipleStocks(token);
  }, [fetchRandomMultipleStocks, token]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/reset/:resetToken" component={NewPasswordPage} />
        <Route path="/reset" component={ResetPage} />
        <Route path="/" exact component={AuthPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user: user,
        token: token,
        login: login,
        logout: logout,
        update: update,
      }}
    >
      <StockContext.Provider
        value={{
          stocks: stocks,
          totalStocks: totalStocks,
          fetchRandomMultipleStocks: fetchRandomMultipleStocks,
        }}
      >
        {token ? (
          <MainNavigation {...props}>
            <Suspense fallback={<LoadingSpinner asOverlay />}>
              {routes}
            </Suspense>
          </MainNavigation>
        ) : (
          <Suspense fallback={<LoadingSpinner asOverlay />}>{routes}</Suspense>
        )}
      </StockContext.Provider>
    </AuthContext.Provider>
  );
};

export default withRouter(App);
