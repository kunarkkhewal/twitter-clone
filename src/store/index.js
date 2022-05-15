import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '', //todo: can be changed later
    users: {
      kunark: 'password',
      user1: 'password',
      user2: 'password'
    },
    icons: [
      {icon: 'far fa-image', id:'image'},
      {icon: 'fas fa-poll-h', id: 'poll'},
      {icon: 'far fa-smile', id: 'smile'},
      {icon: 'fas fa-calendar-alt', id: 'calendar'},
      {icon: 'fas fa-map-marker-alt', id: 'marker'}
    ],
    following: [
      {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '20 min', tweet: 'Should I just quarantine on mars??', comments: '1,000', retweets: '550', like: '1,000,003'},
      {src: 'display-picture.png', name: 'Kevin Hart', handle: '@miniRock', time: '55 min', tweet: 'Should me and the rock do another sub-par movie together????', comments: '2,030', retweets: '50', like: '20,003'},
      {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Haha just made a flame thrower. Shld I sell them?', comments: '100,000', retweets: '1,000,002', like: '5,000,003'},
      {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Just did something crazyyyyyyy', comments: '100,500', retweets: '1,000,032', like: '5,000,103'}
    ],
    tweets: [
      {content: 'It is so nice outside!'}
    ],
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
        return state.users[username]
      }
      return '';
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
      state.tweets.push(newTweet);
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
