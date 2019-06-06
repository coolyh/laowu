import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',//负责人
  user_name: '',//负责人电话 账号
  com_name: '',//	企业名称
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_COM_ID: (state, com_id) => {
    state.com_id = com_id
  },
  SET_USER_NAME: (state, user_name) => {
    state.user_name = user_name
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_COM_NAME: (state, com_name) => {
    state.com_name = com_name
  }
}

const actions = {
  // 用户登录
  LoginByUsername({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.sign)
        setToken(data.sign)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 企业基本信息获取
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const {user_id, nick_name, user_name, com_name,com_id} = data

        commit('SET_USER_ID', user_id)
        commit('SET_COM_ID', com_id)
        commit('SET_NAME', nick_name)
        commit('SET_USER_NAME', user_name)
        commit('SET_COM_NAME', com_name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout( { username : state.user_name} ).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
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

