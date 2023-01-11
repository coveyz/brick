interface Options {
  timer?: number
}

export class Update {
  oldScript: string[]
  newScript: string[]
  dispatch: Record<string, Function[]>

  constructor(options: Options) {
    this.oldScript = []
    this.newScript = []
    this.dispatch = {}
    this.init()
    this.timing(options?.timer)
  }
  //* 发布订阅
  on(key: 'no-update' | 'update', fn: Function) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);
    return this
  }
  //* 初始化
  async init() {
    const html: string = await this.getHTML();
    // this.oldScript = this.
    console.log(html);
    console.log('after-html=>', this.parserScript(html));
    this.oldScript = this.parserScript(html)
  }
  //* 获取 读取index html
  async getHTML() {
    const html = await fetch('/').then(res => res.text());
    return html
  }
  //* 解析 Script
  parserScript(html: string) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig);
    return html.match(reg) as string[]
  }
  //* 比较
  compare(oldArr: string[], newArr: string[]) {
    const base = oldArr.length, arr = Array.from(new Set(oldArr.concat(newArr)));
    if (base === arr.length) {
      this.dispatch['no-update'].forEach(fn => {
        fn()
      })
    } else {
      console.log(this.dispatch)
      this.dispatch['update'].forEach(fn => {
        fn()
      })
    }
  }
  timing(time = 10000) {
    setInterval(async () => {
      const newHtml: string = await this.getHTML();
      this.newScript = this.parserScript(newHtml);
      this.compare(this.oldScript, this.newScript);
    }, time)
  }
}