// 获取随机数
export function randomString(): string {
  return Math.random().toString(36).substr(2, 15)
}

// 获取当前时间戳
export function timeStamp(): string {
  // @ts-ignore
  return parseInt(new Date().getTime() / 1000, 0) + ''
}



