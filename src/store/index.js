import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '',
    users: {},
    // users: {
    //   kunark: {password: 'password', name: 'Kunark', username: 'kunark', location: 'New Delhi', joined: 'July 2017'},
    //   user1: {password: 'password', name: 'User 1', username: 'user1', location: 'New Delhi', joined: 'July 2018'},
    //   user2: {password: 'password', name: 'User 2', username: 'user2', location: 'New Delhi', joined: 'July 2019'}
    // },
    icons: [
      {icon: 'far fa-image', id:'image'},
      {icon: 'fas fa-poll-h', id: 'poll'},
      {icon: 'far fa-smile', id: 'smile'},
      {icon: 'fas fa-calendar-alt', id: 'calendar'},
      {icon: 'fas fa-map-marker-alt', id: 'marker'}
    ],
    following: {
      kunark: ['user1', 'user2'],
      user2: ['kunark']
    },
    followers: {
      kunark: ['user2'],
      user1: ['kunark'],
      user2: ['kunark']
    },
    tabs: [
      {icon: 'fas fa-home', title: 'Home', id:'home'},
      {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
      {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
      {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
      {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
      {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
      {icon: 'far fa-user', title: 'Profile', id: 'profile'},
      {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
    ],
    tweets: {
      kunark: [{content: 'It is good!!!', timestamp: 1652616992000 }],
      user1: [{content: 'User1 Tweet1', timestamp: 1652420152000 }],
      user2: [{content: 'User2 Tweet1', timestamp: 1652530552000 }]
    },
    trending: [
      {top: 'Trending in India', title: 'Shivling', bottom: 'Trending: Gyanvapi'},
      {top: 'Music', title: 'Srivalli', bottom: '135K Tweets'},
      {top: 'Pop', title: 'Nucleya', bottom: '40k tweets'},
      {top: 'Trending in World', title: 'Rus vs Ukr War', bottom: '40k tweets'},
      {top: 'Trending', title: 'I am lit', bottom: '25.4k tweets'},
    ]
  },
  getters: {
    ifUserExists: (state) => (username) => {
      if (state.users[username]) {
        return true
      }
      return false;
    },
    getUserPassword: (state) => (username) => {
      if (state.users[username]) {
        return state.users[username].password
      }
      return '';
    },
    getUserInfo: (state) => (username) => {
      if (state.users[username]) {
        const userInfo = {...state.users[username]};
        delete userInfo.password
        return userInfo
      }
      return {};
    },
    getUserTweets: (state) => (username) => {
      if (state.tweets[username]) {
        let tweets = state.tweets[username]
        tweets.forEach(tweet => {
          tweet.username = username;
          tweet.name = state.users[username] && state.users[username].name
        })
        return tweets;
      }
      return [];
    },
    //Feed is for current logged in user
    getFeed(state, getters) {
      const users = [state.loggedInUser];
      if (state.following[state.loggedInUser]) {
        users.push(...state.following[state.loggedInUser])
      }
      let tweets = [];
      users.forEach(user => {
        tweets = [...tweets, ...getters.getUserTweets(user)]
      })
      return tweets; 
    },
    getFollowing: (state) => (username) => {
      if (state.following[username]) {
        return state.following[username]
      }
      return [];
    },
    getFollowers: (state) => (username) => {
      if (state.followers[username]) {
        return state.followers[username]
      }
      return [];
    },
    getNotFollowedUsers: (state, getters) => {
      let users = Object.keys(state.users);
      let followingUsers = getters.getFollowing(state.loggedInUser);
      users = users.filter(user => !followingUsers.includes(user));
      users.splice(users.indexOf(state.loggedInUser), 1);
      return users.map(user => {
        return { 
          name: state.users[user].name, 
          username: state.users[user].username
        }
      });
    }
  },
  mutations: {
    login (state, username, userData) {
      state.isLoggedIn = true;
      state.loggedInUser = username;
      state.users[username] = userData
    },
    logout (state) {
      state.isLoggedIn = false;
      state.loggedInUser = '';
      state.users = {}
    },
    updateLoggedInUser: (state, username) => {
      state.isLoggedIn = true;
      state.loggedInUser = username;
    },
    createUser (state, userInfo) {
      state.users[userInfo.username] = {}
      state.users[userInfo.username] = userInfo;
    },
    addTweet (state, newTweet) {
      state.tweets = {
        ...state.tweets
      }
      state.tweets[state.loggedInUser] = state.tweets[state.loggedInUser] || [];
      state.tweets[state.loggedInUser].push(newTweet);
    },
    followUser (state, username) {
      state.following = {
        ...state.following
      }
      state.followers = {
        ...state.followers
      }
      state.following[state.loggedInUser] = state.following[state.loggedInUser] || [];
      if(!state.following[state.loggedInUser] || !state.following[state.loggedInUser].includes(username)) {
        state.following[state.loggedInUser] = [...state.following[state.loggedInUser], username];
      }
      state.followers[username] = state.followers[username] || [];
      if(!state.followers[username] || !state.followers[username].includes(state.loggedInUser)) {
        state.followers[username] = [...state.followers[username], state.loggedInUser];
      }
    }, 
    unfollowUser (state, username) {
      state.following = {
        ...state.following
      }
      state.followers = {
        ...state.followers
      }
      if(state.following[state.loggedInUser] && state.following[state.loggedInUser].includes(username)) {
        let index = state.following[state.loggedInUser].indexOf(username);
        state.following[state.loggedInUser].splice(index, 1);
      }
      if(state.followers[username] && state.followers[username].includes(state.loggedInUser)) {
        let index = state.followers[username].indexOf(state.loggedInUser);
        state.followers[username].splice(index, 1);
      }
    }
  },
  actions: {
    login ({ commit }, username) {
      commit('login', username);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggenInUser', username);
      router.push('/');
    },
    logout ({ commit }) {
      commit('logout');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggenInUser');
      router.push('/login');
    },
    fetchLoggedInUser({ commit }) {
      commit('updateLoggedInUser', localStorage.getItem('loggenInUser'));
    },
    createUser ({ commit }, userInfo) {
      commit('createUser', userInfo);
      router.push('/login');
    }
  }
})
