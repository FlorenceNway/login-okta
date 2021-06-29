import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Private from './components/Private';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';

 const oktaAuth = new OktaAuth({
   issuer: 'https://dev-3358180.okta.com/oauth2/default',
   clientId: '0oa13hki4aZcTYaJ45d7',
   redirectUri: window.location.origin + '/callback'
 });



function App() {
  const history = useHistory();
  const restoreOriginalUri = async(_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin))
  }
  return (
    <div className="App">
      <div className="page">
        <div className="content">
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Header/>
            <Route path='/' exact={true} component={Home}/>
            <SecureRoute path='/private' exact={true} component={Private}/>
            <Route path='/callback' component={LoginCallback} />
          </Security>
        </div>
      </div>
    </div>
  );
}

export default App;
