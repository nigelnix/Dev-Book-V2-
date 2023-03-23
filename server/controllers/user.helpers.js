import { join } from 'path'
import { rm } from 'fs/promises'
import { env } from 'process'
import { __dirname as rootDir } from '../app.js'
const { NODE_ENV } = env
const deleteReplacedPicture = (user, target) =>
  user[target]
    ? rm(join(rootDir, user[target])).catch(
        (err) => NODE_ENV === 'development' && console.log(err)
      )
    : undefined
const attachQueries = (query, reqQueryFilters) => {
  const { posts, friends } = reqQueryFilters
  if (posts === 'true') {
    query.populate({
      path: 'posts',
    })
  }
  if (friends === 'true') {
    query.populate({
      path: 'friends',
      select: 'username userPic nickname',
    })
  }
  return query
}
export { deleteReplacedPicture, attachQueries }
