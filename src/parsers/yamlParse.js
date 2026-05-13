import yaml from 'js-yaml'

const parse = (content) => {
  return yaml.load(content)
}

export default parse
