class LocalStorageHelper {
  init(key: string, initializer: unknown) {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, JSON.stringify(initializer));
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  reset() {
    localStorage.clear();
  }
}

export default LocalStorageHelper;
