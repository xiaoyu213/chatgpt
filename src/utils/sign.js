// eslint-disable-next-line @typescript-eslint/no-var-requires
const MD5 = require("crypto-js/md5");

function getSign(timestamp) {
  // 密钥npm
  const secret = "NEGXgdJArkB#X0NPo^M";
  // 1O位时间戳
  const timestampStr = parseInt(String(timestamp / 1000)).toString();
  // 20位随机数
  const nonce = timestamp;
  const params = {
    timestampStr: null,
    nonce: null,
  };
  params.timestampStr = timestampStr;
  params.nonce = nonce;
  // 取 key
  const sortedKeys = [];
  for (const key in params) {
    // 注意这里，要剔除掉 sign 参数本身
    if (key !== "sign") {
      sortedKeys.push(key);
    }
  }
  // 参数名 ASCII 码从小到大排序（字典序）
  sortedKeys.sort();
  // 1 拼接参数
  let str = "";
  sortedKeys.forEach((key) => {
    str += key + params[key];
  });
  // 2 拼接密钥
  str += secret;
  // 3 MD5加密
  return MD5(str).toString().toUpperCase();
}
export default getSign;
