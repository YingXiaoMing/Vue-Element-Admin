import * as local from '@/utils/local'

export default {
  namespaced: true,
  state: {
    menus: [],
    menuActive: ''
  },
  getters: {
    menus: state => state.menus,
    menuActive: state => state.menuActive
  },
  mutations: {
    SET_MENUS: (state, payload) => {
      state.menus = payload
      local.set('menus', payload)
    },
    SET_MENU_ACTIVE: (state, payload) => {
      state.menuActive = payload
    }
  },
  actions: {}
}
