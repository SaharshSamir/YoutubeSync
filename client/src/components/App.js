import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Room from './Room';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/room" component={Room} />
      </div>
    </BrowserRouter>
  );
}

export default App;
