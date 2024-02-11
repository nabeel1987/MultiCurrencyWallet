import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import CSSModules from 'react-css-modules'
import { menuItemsData } from './MenuItemsData'
import styles from './Nav.scss'
import { localisedUrl } from 'helpers/locale'

import config from 'helpers/externalConfig'
import Logo from '../Logo/Logo'

type NavProps = {
  menu: IUniversalObj[]
  intl: any
}
type SubMenuItem = {
  title: string
  url: string
}

type MenuItem = {
  title: string
  url: string
  submenu?: SubMenuItem[] // Optional submenu array
}
// In a global .d.ts file (e.g., global.d.ts)
declare module 'react' {
  interface CSSProperties {
    '--arrow-position'?: string // Add custom CSS property
  }
}
type NavState = {
  activeSubMenu: string | null
  hoveredItemIndex: number | null
  arrowPosition: string // Add this line
}
//@ts-ignore: strictNullChecks
@withRouter
@CSSModules(styles, { allowMultiple: true })
class Nav extends Component<NavProps, NavState> {
  state = {
    activeSubMenu: null,
    hoveredItemIndex: null,
    arrowPosition: '50%', // Initialize arrowPosition
  }
  calculateArrowPosition = (index: number) => {
    const menuItem = document.querySelector(`.menu-item:nth-child(${index + 1})`)
    if (!menuItem) return '50%'

    const menuRect = menuItem.getBoundingClientRect()
    const navElement = menuItem.closest('.nav-bg')
    if (!navElement) return '50%' // Check if navElement is not null

    const navRect = navElement.getBoundingClientRect()
    const menuItemCenter = menuRect.left + menuRect.width / 2 - navRect.left
    return `${menuItemCenter}px`
  }

  handleMouseEnter = (menuTitle, index) => {
    const arrowPosition = this.calculateArrowPosition(index)
    this.setState({ activeSubMenu: menuTitle, arrowPosition })
  }

  handleMouseLeave = () => {
    this.setState({ activeSubMenu: null })
  }
  // Assuming no props are passed to Nav for now
  renderSubMenu = (submenu: SubMenuItem[], menuTitle: string) => {
    const { activeSubMenu, hoveredItemIndex } = this.state

    // Only render the submenu if it's the active one
    if (activeSubMenu === menuTitle) {
      let arrowPosition = '50%' // Default position

      // Check if hoveredItemIndex is not null before calling calculateArrowPosition
      if (hoveredItemIndex !== null) {
        arrowPosition = this.calculateArrowPosition(hoveredItemIndex)
      }

      return (
        <ul styleName="submenu">
          {submenu.map((item, index) => (
            <li key={index} style={{ '--arrow-position': arrowPosition }}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )
    }
    return null
  }

  render() {
    const {
      menu,
      intl: { locale },
    } = this.props
    return (
      <nav styleName="nav-bg">
        <div styleName="container">
          <a href="/" styleName="logo-link">
            <Logo />
          </a>
          <div styleName="main_block">
            <div id="mega-menu-full" styleName="mega-menu">
              <ul styleName="menu-list">
                <div styleName="menu_block">
                  {menuItemsData.map((item, index) => (
                    <li
                      key={index}
                      styleName="menu-item"
                      onMouseEnter={() => this.handleMouseEnter(item.title, index)}
                      onMouseLeave={this.handleMouseLeave}
                    >
                      <a href="#">{item.title}</a>
                      {item.submenu && this.renderSubMenu(item.submenu, item.title)}
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

//@ts-ignore: strictNullChecks
export default injectIntl(Nav)
