const Base = require('./base');

class User extends Base {
  // 定义参数默认值为 users 表
  constructor(props = 'user'){
    super(props);
  }
}

module.exports = new User();