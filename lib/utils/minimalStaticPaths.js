import BLOG from '@/blog.config'

/**
 * 是否启用「最小预渲染」：构建阶段不枚举动态路由，首次访问再按需生成（需配合 getStaticProps 的 revalidate）。
 */
export function shouldMinimalStaticPathsBuild() {
  return BLOG.MINIMAL_STATIC_PATHS_BUILD === true
}

/**
 * @returns {{ paths: [], fallback: 'blocking' }}
 */
export function minimalStaticPathsResult() {
  console.log(
    '[getStaticPaths] NEXT_BUILD_MINIMAL_STATIC_PATHS: 跳过预生成路径，按需 ISR'
  )
  return { paths: [], fallback: 'blocking' }
}
