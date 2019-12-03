const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

/*
 * formatMoney(value,type)
 * 功能：金额按千位逗号分割
 * 参数：value，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */
export function formatMoney(value, type) {
  if (/[^0-9\.]/.test(value))
    return "0";
  if (value == null || value == "")
    return "0";
  value = value.toString().replace(/^(\d*)$/, "$1.");
  value = (value + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  value = value.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(value))
    value = value.replace(re, "$1,$2");
  value = value.replace(/,(\d\d)$/, ".$1");
  if (type == 0) {// 不带小数位(默认是有小数位)
    var a = value.split(".");
    if (a[1] == "00") {
      value = a[0];
    }
  }
  return value;
}