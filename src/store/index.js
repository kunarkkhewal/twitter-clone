import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loggedInUser: '',
    server_host: 'http://localhost:5000',
    users: {},
    profileUser: {},
    icons: [
      {icon: 'far fa-image', id:'image'},
      {icon: 'fas fa-poll-h', id: 'poll'},
      {icon: 'far fa-smile', id: 'smile'},
      {icon: 'fas fa-calendar-alt', id: 'calendar'},
      {icon: 'fas fa-map-marker-alt', id: 'marker'}
    ],
    notFollowingUsers: [],
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
    tweets: [],
    trending: [
      {top: 'Trending in India', title: 'Shivling', bottom: 'Trending: Gyanvapi'},
      {top: 'Music', title: 'Srivalli', bottom: '135K Tweets'},
      {top: 'Pop', title: 'Nucleya', bottom: '40k tweets'},
      {top: 'Trending in World', title: 'Rus vs Ukr War', bottom: '40k tweets'},
      {top: 'Trending', title: 'I am lit', bottom: '25.4k tweets'},
    ],
    offset: 0,
    limit: 3,
    isFollowingProfileUser: false,
    lastAction: ''
  },
  getters: {
    getUserInfo: (state) => (username) => {
      if (state.users[username]) {
        const userInfo = {...state.users[username]};
        delete userInfo.password
        return userInfo
      }
      return {};
    },
  },
  mutations: {
    login (state, {username, userData}) {
      state.isLoggedIn = true;
      state.loggedInUser = username;
      state.users[username] = userData
    },
    logout (state) {
      state.isLoggedIn = false;
      state.loggedInUser = '';
      state.users = {};
      state.tweets = {};
    },
    updateLoggedInUser: (state, {username, userData}) => {
      if (username) {
        state.isLoggedIn = true;
        state.loggedInUser = username;
        state.users[username] = userData;
      }
    },
    addProfileUser: (state, user) => {
      if(user.data && user.data.id) {
        state.profileUser = user.data;
      }
    },
    removeProfileUser: (state) => {
      state.profileUser = {};
    },
    updateTweets (state, tweets) {
      state.tweets = [...tweets.data];
    },
    updateNotFollowingUsers (state, users) {
      const userList = users && users.data ? users.data : [];
      state.notFollowingUsers.push(...userList)
    },
    updateOffset (state, value) {
      state.offset = value ? state.offset + value : state.offset + state.limit ;
    },
    updateLimit (state, value = 3) {
      state.limit = value;
    },
    removeFollowingUser (state, userid) {
      if (state.notFollowingUsers.length) {
        state.notFollowingUsers = state.notFollowingUsers.filter(user => user.id != userid);
      }
    },
    addUnfollowingUser (state) {
      if (state.notFollowingUsers.length) {
        state.notFollowingUsers.push({
          id: state.profileUser.id,
          name: state.profileUser.name,
          username: state.profileUser.username
        });
      }
    },
    updateIsFollowingProfileUser (state, isFollowing) {
      state.isFollowingProfileUser = isFollowing;
    },
    updateLastAction (state, action) {
      state.lastAction = action
    }
  },
  actions: {
    login ({ commit }, {username, userData}) {
      commit('login', {username, userData});
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', username);
      localStorage.setItem('userData', JSON.stringify(userData));
      router.push('/');
    },
    logout ({ commit }) {
      commit('logout');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('userData');
      router.push('/login');
    },
    fetchLoggedInUser({ commit }) {
      commit('updateLoggedInUser', {
        username: localStorage.getItem('loggedInUser'), 
        userData: JSON.parse(localStorage.getItem('userData'))
      });
    },
    async createUser ({ state }, userInfo) {
      await axios.post(`${state.server_host}/user`, userInfo)
      router.push('/login');
    },
    async getProfileUser ({ state, commit }, username) {
      const follower = state.users[state.loggedInUser] && state.users[state.loggedInUser].id
      const user = await axios.get(`${state.server_host}/user/username/${username}`);
      const following = user.data.id;
      if (follower != following) {
        const isFollowingProfileUser = await axios.get(`${state.server_host}/follow/isfollowing/${follower}/${following}`);
        commit('updateIsFollowingProfileUser', isFollowingProfileUser.data);
      }
      commit('addProfileUser', user);
    },
    async getUserTweets ({ state, commit }) {
      const userid = state.profileUser && state.profileUser.id
      const tweets = await axios.get(`${state.server_host}/tweet/user/${userid}`);
      commit('updateTweets', tweets);
    },
    async getFeedTweets ({ state, commit }) {
      const userid = state.users[state.loggedInUser] && state.users[state.loggedInUser].id
      const tweets = await axios.get(`${state.server_host}/tweet/feed/${userid}`);
      commit('updateTweets', tweets);
    },
    async addTweet ({ state, dispatch }, tweet) {
      const userid = state.users[state.loggedInUser] && state.users[state.loggedInUser].id
      tweet.userid = userid;
      await axios.post(`${state.server_host}/tweet`,tweet);
      dispatch('getFeedTweets');
    },
    async getNotFollowingUsers ({ state, commit }, checkForThree) {
      if (!checkForThree || state.notFollowingUsers.length < 3) {
        if (state.lastAction == 'unfollow') {
          commit('updateOffset', -1)
        }
        const userid = state.users[state.loggedInUser] && state.users[state.loggedInUser].id
        const users = await axios.get(`${state.server_host}/user/notfollowingusers/${userid}/${state.offset}/${state.limit}`);
        commit('updateNotFollowingUsers', users);
        commit('updateOffset');
        commit('updateLimit');
      }
    },
    async followUser ({ state, commit, dispatch }, userid) {
      const body = {
        follower: state.users[state.loggedInUser] && state.users[state.loggedInUser].id,
        following: userid
      }
      await axios.post(`${state.server_host}/follow`, body);
      commit('removeFollowingUser', userid);
      commit('updateIsFollowingProfileUser', userid == state.profileUser.id);
      commit('updateOffset', -1);
      commit('updateLastAction', 'follow')
      if (!state.profileUser.id) {
        dispatch('getNotFollowingUsers', true);
        dispatch('getFeedTweets')
      }
    },
    async unfollowUser ({ state, commit }, userid) {
      const body = {
        follower: state.users[state.loggedInUser] && state.users[state.loggedInUser].id,
        following: userid
      }
      await axios.post(`${state.server_host}/follow/unfollow`, body);
      commit('updateIsFollowingProfileUser', false);
      commit('addUnfollowingUser');
      commit('updateLastAction', 'unfollow')
      commit('updateOffset', 1);
    }
  }
})
