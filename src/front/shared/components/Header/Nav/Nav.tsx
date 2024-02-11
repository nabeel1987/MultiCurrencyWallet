import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import CSSModules from 'react-css-modules'
import { localisedUrl } from 'helpers/locale'
import config from 'helpers/externalConfig'
import { menuItemsData } from './MenuItemsData'
import styles from './Nav.scss'

import Logo from '../Logo/Logo'

type NavProps = {
  menu: IUniversalObj[]
  intl: any
}
type SubMenuItem = {
  title: string
  url: string
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
  activeMenuIndex: string | null
  isMenuOpen: boolean
}
// @ts-ignore: strictNullChecks
@withRouter
@CSSModules(styles, { allowMultiple: true })
class Nav extends Component<NavProps, NavState> {
  // Class property for refs
  menuItemRefs: Array<HTMLLIElement | null> = [] // Declare and initialize menuItemRefs

  menuListRef = React.createRef<HTMLUListElement>()

  // Initialize state
  state = {
    activeSubMenu: null,
    hoveredItemIndex: null,
    arrowPosition: '50%', // Initialize arrowPosition
    activeMenuIndex: null, // New state to track active menu index
    isMenuOpen: false,
  }

  constructor(props: NavProps) {
    super(props)
    // Initialize menuItemRefs array in the constructor
    this.menuItemRefs = []
  }

  toggleMenu = () => {
    this.setState((prevState) => {
      console.log('Toggling menu. Current state:', prevState.isMenuOpen)
      return { isMenuOpen: !prevState.isMenuOpen }
    })
  }

  calculateArrowPosition = (index: number) => {
    const menuItem = this.menuItemRefs[index]
    if (!menuItem || !this.menuListRef.current) {
      console.log('Menu item or menu list not found')
      return '50%'
    }

    const menuRect = menuItem.getBoundingClientRect()
    const menuListRect = this.menuListRef.current.getBoundingClientRect()

    const menuItemCenter = menuRect.left + menuRect.width / 2 - menuListRect.left
    console.log('menuRect:', menuRect)
    console.log('menuListRect:', menuListRect)

    console.log('menuItemCenter:', menuItemCenter)

    return `${menuItemCenter}px`
  }

  handleMouseEnter = (menuTitle, index) => {
    const arrowPosition = this.calculateArrowPosition(index)
    console.log('Hovered on: ', menuTitle, ' | Calculated Arrow Position: ', arrowPosition)
    this.setState({ activeSubMenu: menuTitle, arrowPosition, activeMenuIndex: index })
  }

  handleMouseLeave = () => {
    this.setState({ activeSubMenu: null, activeMenuIndex: null })
  }

  toggleSubMenu = (menuTitle) => {
    this.setState((prevState) => ({
      activeSubMenu: prevState.activeSubMenu === menuTitle ? null : menuTitle,
      // Keep or update other state properties as necessary
    }))
  }

  renderSubMenu = () => {
    const { activeSubMenu, arrowPosition } = this.state
    let submenuItems: SubMenuItem[] = []

    menuItemsData.forEach((item) => {
      if (item.title === activeSubMenu) {
        submenuItems = item.submenu || []
      }
    })

    if (submenuItems.length > 0) {
      return (
        <div styleName="submenu_block" style={{ display: 'block' }}>
          <div styleName="submenu" style={{ '--arrow-position': arrowPosition }}>
            {submenuItems.map((item, index) => (
              <div key={index}>
                <a href={item.url} style={{ textAlign: 'center' }}>
                  {item.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const {
      menu,
      intl: { locale },
    } = this.props
    console.log(
      'Menu class:',
      `${styles['menu-wrapper']} ${this.state.isMenuOpen ? styles['mobile-visible'] : ''}`
    )

    return (
      <nav styleName="nav-bg" className="nav-bg">
        <div styleName="container">
          <a href="/" styleName="logo-link">
            <Logo />
          </a>
          <button onClick={this.toggleMenu} styleName="menu-toggle desktop-visible">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              width="10px"
              height="10px"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>{' '}
          <div>
            <div styleName={`menu-wrapper ${this.state.isMenuOpen ? 'mobile-visible' : ''}`}>
              <ul styleName="menu-list" ref={this.menuListRef}>
                {menuItemsData.map((item, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => this.handleMouseEnter(item.title, index)}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    <li
                      ref={(el) => (this.menuItemRefs[index] = el)}
                      styleName={`menu-item ${
                        this.state.activeSubMenu === item.title ? 'active' : ''
                      }`}
                    >
                      <a href="#">{item.title}</a>
                    </li>
                    {this.state.activeSubMenu === item.title && this.renderSubMenu()}
                  </div>
                ))}
              </ul>

              <ul styleName="mobile_menu-list">
                {menuItemsData.map((item, index) => (
                  <div key={index}>
                    <li
                      styleName="mobile_menu"
                      onClick={() => this.toggleSubMenu(item.title)} // Change to onClick
                    >
                      <a href="#">{item.title}</a>
                      {/* Optionally include an SVG arrow icon here */}
                    </li>
                    {this.state.activeSubMenu === item.title && this.renderSubMenu()}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={this.toggleMenu}
            styleName="menu-toggle mobile-visible "
            style={{ position: 'absolute', right: '0' }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              width="10px"
              height="10px"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    )
  }
}
// @ts-ignore: strictNullChecks
export default injectIntl(Nav)
