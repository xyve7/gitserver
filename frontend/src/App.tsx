import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RepositoryView from './components/RepositoryView';
import Home from './components/Home';
import Cookies from 'js-cookie';

const RefreshOnBack = () => {
  useEffect(() => {
    const handlePopstate = (event: any) => {
      if (event.state && event.state.refresh) {
        window.location.reload();
      }
    };

    const handleBeforeUnload = () => {
      window.history.replaceState({ refresh: true }, document.title);
    };

    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

function App() {
  if (Cookies.get('theme') == 'dark') {
    document.documentElement.setAttribute("theme", "dark");
  } else {
    document.documentElement.setAttribute("theme", "light");
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Include the RefreshOnBack component in the route */}
          <Route
            path="/:id/*"
            element={
              <>
                <RefreshOnBack />
                <RepositoryView />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
