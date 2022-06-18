class ZStorage {
  get(key: string, default_value?: string) {
    if (process.server) return

    const value = localStorage.getItem(key)

    if (!value && default_value) {
      this.set(key, default_value)

      return default_value
    }

    return value
  }

  set(key: string, value: string) {
    if (process.server) return

    return localStorage.setItem(key, value)
  }
}

export default new ZStorage()
