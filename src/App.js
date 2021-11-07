import React from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import {  Navbar, Main, MainFooter } from './components';
import { About, Resources, Contact } from './pages'
import {ChartProvider} from './context/ChartContext'
import history from './history';
import styles from './App.module.css';

const App = () => {

    return (
      <ChartProvider>
        <Router history={history}>
          <div className={styles.container}>
            <Navbar/>
              <Switch>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/resources">
                  <Resources />
                </Route>
                <Route exact path="/contact">
                  <Contact />
                </Route>
                <Route path="/">
                  <Main />
                </Route>
              </Switch>
            <MainFooter />
          </div>
      </Router>
    </ChartProvider>
  );
}

export default App;
