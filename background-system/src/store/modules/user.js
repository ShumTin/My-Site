import { login, getInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null // 存储登录后用户信息
  }
}

const state = getDefaultState()

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(resp => {
        const { data } = resp
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject(resp)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(resp => {
        if (typeof resp === 'string') {
          resp = JSON.parse(resp)
          if (resp.code === 401) {
            reject(resp.msg)
          }
        } else {
          const { data } = resp
          commit('SET_USER', data)
          resolve(data)
        }
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

