class Base {
  success<T>(data: T) {
    return {
      code: 20000,
      message: '',
      data
    }
  }
  error(code: number, message: string) {
    return {
      code,
      message,
      data: null
    }
  }
}


export default Base