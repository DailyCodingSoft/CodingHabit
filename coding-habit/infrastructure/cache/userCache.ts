type CachedUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  cachedAt: number;
};

const userCache = new Map<string, CachedUser>();

export const getUserCache = (id: string) =>
  userCache.get(id);

export const setUserCache = (id: string, user: CachedUser) =>
  userCache.set(id, { ...user, cachedAt: Date.now() });

export const deleteUserCache = (id: string) =>
  userCache.delete(id);