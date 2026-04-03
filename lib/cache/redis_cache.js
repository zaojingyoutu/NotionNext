import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'

/**
 * 仅在服务端懒加载 ioredis，避免客户端打包解析 net/tls/dns
 */
let redisClient = null

function getRedisClient() {
  if (typeof window !== 'undefined') return null
  if (!BLOG.REDIS_URL) return null
  if (!redisClient) {
    const Redis = require('ioredis')
    redisClient = new Redis(BLOG.REDIS_URL)
  }
  return redisClient
}

const cacheTime = Math.trunc(
  siteConfig('NEXT_REVALIDATE_SECOND', BLOG.NEXT_REVALIDATE_SECOND) * 1.5
)

export async function getCache(key) {
  const client = getRedisClient()
  if (!client) return null
  try {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error(`redisClient读取失败 ${String(e)}`)
  }
}

export async function setCache(key, data, customCacheTime) {
  const client = getRedisClient()
  if (!client) return
  try {
    await client.set(
      key,
      JSON.stringify(data),
      'EX',
      customCacheTime || cacheTime
    )
  } catch (e) {
    console.error(`redisClient写入失败 ${String(e)}`)
  }
}

export async function delCache(key) {
  const client = getRedisClient()
  if (!client) return
  try {
    await client.del(key)
  } catch (e) {
    console.error(`redisClient删除失败 ${String(e)}`)
  }
}

export default { getCache, setCache, delCache }
