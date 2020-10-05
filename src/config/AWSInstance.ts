import Axios from 'axios';

const baseUrl = () => {
    if(process.env.REACT_APP_ENV === "production") {
        return 'http://api-civ2.andrewmcguiness.com/';
    }

    if(process.env.REACT_APP_ENV === "development") {
        return 'http://localhost:8080/';
    }

    return 'http://localhost:8080/';
}

const AWSInstance = Axios.create({
    baseURL: baseUrl()
});

export default AWSInstance;
