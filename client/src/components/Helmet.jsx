import React from 'react';

const Helmet = ({ title, children }) => {
  document.title = `${title} | KComics`;
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default Helmet;