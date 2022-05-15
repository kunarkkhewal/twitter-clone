import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '', //todo: format can be changed later
    users: {
      kunark: {password: 'password', name: 'Kunark', location: 'New Delhi', joined: 'July 2017'},
      user1: {password: 'password', name: 'User 1', location: 'New Delhi', joined: 'July 2018'},
      user2: {password: 'password', name: 'User 2', location: 'New Delhi', joined: 'July 2019'}
    },
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
    tweets: {
      kunark: [{content: 'It is so nice outside!', timestamp: 1652616992000 }], //todo: add likes and all
      user1: [{content: 'User1 Tweet1', timestamp: 1652420152000 }],
      user2: [{content: 'User2 Tweet1', timestamp: 1652530552000 }]
    },
    friends: [
      {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy'},
      {src: 'display-picture.png', name: 'Adrian Monk', handle: '@detective:)'},
      {src: 'display-picture.png', name: 'Kevin Hart', handle: '@miniRock'}
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
        // return {name: state.users[username].name}
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
          tweet.name = state.users[username].name
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
    }
  },
  mutations: {
    login (state, username) {
      state.isLoggedIn = true;
      state.loggedInUser = username;
    },
    logout (state) {
      state.isLoggedIn = false;
      state.loggedInUser = '';
    },
    addTweet (state, newTweet) {
      state.tweets[state.loggedInUser].push(newTweet);
    },
  },
  actions: {
    login ({commit}, username) {
      commit('login', username);
      router.push('/');
    },
    logout ({ commit }) {
      commit('logout');
      router.push('/login');
    }
  },
  modules: {
  }
})
