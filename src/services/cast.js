/**
 * Cast an object to a user model
 * @param {Object} user
 */
export const castToUser = user => {
  const { email, username, fullname } = user
  return omit({ email, username, fullname })
}

const omit = obj => {
  Object.keys(obj).forEach(key => {
    return obj[key] === undefined && delete obj[key]
  })
  return obj
}
