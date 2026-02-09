import defaultSettings from '@/settings'
import { getSetting, updateSetting } from '@/api/setting'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  personalSetting: null
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_DATA: (state, setting) => {
    state.personalSetting = setting
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  async fetchSetting({ commit }) {
    const setting = await getSetting()
    commit('SET_DATA', setting.data)
  },
  updateSetting({ commit }, data) {
    return new Promise((resolve) => {
      commit('SET_DATA', data)
      updateSetting(data)
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

