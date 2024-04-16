import { Module } from 'vuex'
import { AuthState } from '../../model'

export const auth: Module<AuthState, AuthState> = {
  namespaced: true,
  state: {
    name: null,
    markerColor: null,
    accessToken: null,
    refreshToken: null,
  },
  getters: {
    name(state) {
      return state.name
    },
    markerColor(state) {
      return state.markerColor
    },
    accessToken(state) {
      return state.accessToken
    },
    refreshToken(state) {
      return state.refreshToken
    },
  },
  mutations: {},
}
