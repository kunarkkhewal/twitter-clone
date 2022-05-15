import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: true,
    loggedInUser: 'kunark', //todo: format can be changed later
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
    // following: [
    //   {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '20 min', tweet: 'Should I just quarantine on mars??', comments: '1,000', retweets: '550', like: '1,000,003'},
    //   {src: 'display-picture.png', name: 'Kevin Hart', handle: '@miniRock', time: '55 min', tweet: 'Should me and the rock do another sub-par movie together????', comments: '2,030', retweets: '50', like: '20,003'},
    //   {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Haha just made a flame thrower. Shld I sell them?', comments: '100,000', retweets: '1,000,002', like: '5,000,003'},
    //   {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Just did something crazyyyyyyy', comments: '100,500', retweets: '1,000,032', like: '5,000,103'}
    // ],
    following: {
      kunark: ['user1', 'user2']
    },
    followers: {
      kunark: ['user2']
    },
    tweets: {
      kunark: [{content: 'It is so nice outside!', timestamp: 1652616992000 }], //todo: add likes and all
      user1: [{content: 'User1 Tweet1', timestamp: 1652530552000 }],
      user2: [{content: 'User2 Tweet1', timestamp: 1652530152000 }]
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
    getUserInfo: (state) => (username = state.loggedInUser) => {
      if (state.users[username]) {
        // return {name: state.users[username].name}
        const userInfo = {...state.users[username]};
        delete userInfo.password
        return userInfo
      }
      return {};
    },
    getUserTweets: (state) => (username = state.loggedInUser) => {
      if (state.tweets[username]) {
        return state.tweets[username]
      }
      return [];
    },
    getFollowing: (state) => (username = state.loggedInUser) => {
      if (state.following[username]) {
        return state.following[username]
      }
      return [];
    },
    getFollowers: (state) => (username = state.loggedInUser) => {
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
