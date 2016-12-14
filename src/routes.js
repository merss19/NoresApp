
import App from './components/app';
import Form from './pages/formAuth';
import Notes from './pages/notes';
import NotFound from './pages/notFound';

export const paths = {
  ROOT: '/',
  Form: '/sign-in',
  Notes: '/',
  Any:'*'
};

export function isAuth(state) {
    console.log('isAuth')
    console.log(state.auth.logged)
  return state.auth.logged;
}

const requireAuth = getState => {
  return (nextState, replace) => {
      console.log('requireAuth')
    if (!isAuth(getState())) {
        console.log('replace-form')
      replace(paths.Form);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
      console.log('requireUnauth')
    if (isAuth(getState())) {
        console.log('replace-notes')
      replace(paths.Notes);
    }
  };
};


export const getRoutes = getState => {
    console.log('getStateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Notes,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.Form,
        component: Form,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.Any,
        component: NotFound
      }
    ]
  };
};
