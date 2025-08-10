/* eslint no-console: "off" */

import React from 'react';
import axios from 'axios';

const TestPage = () => {
  React.useEffect(() => {
    axios
      .get('/api/feeds', {
        params: {
          date: new Date().toJSON().slice(0, 10),
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div />;
};

export default TestPage;
