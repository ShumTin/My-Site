const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  user: state => state.user.user,
  personalSetting: state => state.settings.personalSetting
}
export default getters
