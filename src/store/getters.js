const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  // user
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  com_id: state => state.user.com_id,
  name: state => state.user.name,
  user_name: state => state.user.user_name,
  com_name: state => state.user.com_name,
}
export default getters
