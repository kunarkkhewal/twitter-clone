const routes = {
    SERVER_HOST: 'http://localhost:5000',
     get USER_DEFAULT_ROUTE() {
        return `${this.SERVER_HOST}/user`;
    },
    get TWEET_DEFAULT_ROUTE() {
        return `${this.SERVER_HOST}/tweet`;
    },
    get FOLLOW_DEFAULT_ROUTE() {
        return `${this.SERVER_HOST}/follow`;
    },
}

export default routes;