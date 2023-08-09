const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/train';


async function companyRegistration() {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      companyName: 'Train Central',
      ownerName: 'veneetha',
      rollNo: '322010301001',
      ownerEmail: 'veneetha2003@gmail.com',
      accessCode: 'oJnNPG'
    });

    if (response.status === 200) {
      console.log('successfully Registration details:');
      console.log('ID:', response.data.clientID);
      console.log('Secret:', response.data.clientSecret);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}


async function getAuthToken() {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, {
      companyName: 'Train Central',
      clientID: 'b46118f0-fbde-4b16-a4b1-6ae6ad718b27',
      ownerName: 'veneetha',
      ownerEmail: 'veneetha2003@gmail.com',
      rollNo: '322010301001',
      clientSecret: 'XOyo10RPasKWODAN'
    });

    if (response.status === 200) {
      const authToken = response.data.access_token;
      return authToken;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}


async function fetchTrainDetails(authToken) {
  try {
    const response = await axios.get(`${BASE_URL}/trains`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (response.status === 200) {
      console.log('Train Details:', response.data);
    }
  } catch (error) {
    console.error('Error fetching train details:', error.message);
  }
}


(async () => {
  await companyRegistration();
  const authToken = await getAuthToken();
  if (authToken) {
    await fetchTrainDetails(authToken);
  }
})();