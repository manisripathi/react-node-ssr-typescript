import axios from 'axios';

const fetchUsersData = (callback: (status: string, res: any) => void) => {
  // const users = axios({
  //   method: 'GET',
  //   url: 'endpoint to call',
  // });

  // users
  //   .then((res) => callback('success', {
  //     users: res.data,
  //   }))
  //   .catch((err) => {
  //     callback('error', err);
  //     throw err;
  //   });

  callback('success', { users: ['Joe', 'John', 'Mary', 'Alex', 'Tom', 'Brady'] });
};

export default fetchUsersData;
