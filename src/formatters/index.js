import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const fomatters = {
  stylish,
  plain,
  json: tree => JSON.stringify(json(tree)),
}
export default fomatters
