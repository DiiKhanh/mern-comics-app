import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import routes from './routes/routes';
import PageWrapper from './components/PageWrapper';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
      <CssBaseline />
      {/* router app */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;