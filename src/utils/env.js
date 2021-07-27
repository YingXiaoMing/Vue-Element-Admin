const API_MAP = {

}

const VUE_APP_ADMIN_API = API_MAP[window.location.host] || process.env.VUE_APP_ADMIN_API
export {
  VUE_APP_ADMIN_API
}
