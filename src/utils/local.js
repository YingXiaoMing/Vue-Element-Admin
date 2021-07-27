/**
 * 存储localStorage
 */
export const set = (name, content) => {
  if (!name) return undefined
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }

  window.localStorage.removeItem(name)
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const get = name => {
  if (!name) return undefined
  const temp = window.localStorage.getItem(name) || undefined
  try {
    return JSON.parse(temp)
  } catch (e) {
    return temp
  }
}

/**
 * 删除localStorage
 */
export const remove = name => {
  if (!name) window.localStorage.clear()
  window.localStorage.removeItem(name)
}
