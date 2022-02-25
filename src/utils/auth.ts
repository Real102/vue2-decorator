import setting from '@/setting'

const storage = window.localStorage
export function getToken(): string | null {
  return storage.getItem(setting.TOKEN_KEY)
}

export function setToken(token: string): void {
  storage.setItem(setting.TOKEN_KEY, token)
}

export function removeToken() {
  storage.removeItem(setting.TOKEN_KEY)
}
