const storage = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  getForIndex(index) {
    return sessionStorage.key(index);
  },
  getKeys() {
    const items = this.getAll();
    const keys = [];
    for (let index = 0; index < items.length; index += 1) {
      keys.push(items[index].key);
    }
    return keys;
  },
  getLength() {
    return sessionStorage.length;
  },
  getSupport() {
    return (typeof (Storage) !== 'undefined');
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  removeAll() {
    sessionStorage.clear();
  },
  getAll() {
    const len = sessionStorage.length; // 获取长度
    const arr = new Array([]); // 定义数据集
    for (let i = 0; i < len; i += 1) {
      // 获取key 索引从0开始
      const getKey = sessionStorage.key(i);
      // 获取key对应的值
      const getVal = sessionStorage.getItem(getKey);
      // 放进数组
      arr[i] = {
        key: getKey,
        val: getVal,
      };
    }
    return arr;
  },
};

export default storage;
