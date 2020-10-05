import Axios from 'axios';

const FirebaseInstance = Axios.create({
    baseURL: 'https://civ-roulette.firebaseio.com/'
});

export default FirebaseInstance;
