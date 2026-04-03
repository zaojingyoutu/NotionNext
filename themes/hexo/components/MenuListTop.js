import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

export const MenuListTop = props => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  const configMenuLinks = siteConfig('HEXO_MENU_LINKS', null, CONFIG)
  const useConfigMenu = Array.isArray(configMenuLinks) && configMenuLinks.length > 0

  let links = [
    {
      id: 1,
      icon: 'fa-solid fa-house',
      name: locale.NAV.INDEX,
      href: '/',
      show: siteConfig('HEXO_MENU_INDEX', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEXO_MENU_SEARCH', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  const useNotionMenu = siteConfig('CUSTOM_MENU') && Array.isArray(customMenu) && customMenu.length > 0

  if (useConfigMenu) {
    links = configMenuLinks.map((item, i) => ({ ...item, id: i, show: item.show !== false }))
  } else if (useNotionMenu) {
    links = customMenu
  }

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i
    }
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      <nav
        id='nav-mobile'
        className='leading-8 justify-center font-light w-full flex'>
        {links?.map(
          (link, index) =>
            link && link.show && <MenuItemDrop key={index} link={link} />
        )}
      </nav>
    </>
  )
}
