import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import CSSModules from 'react-css-modules'

import styles from './Nav.scss'
import { localisedUrl } from 'helpers/locale'

import config from 'helpers/externalConfig'
import Logo from '../Logo/Logo'

type NavProps = {
  menu: IUniversalObj[]
  intl: any
}

//@ts-ignore: strictNullChecks
@withRouter
@CSSModules(styles, { allowMultiple: true })
class Nav extends Component<NavProps, null> {
  render() {
    const {
      menu,
      intl: { locale },
    } = this.props

    const beforeMenuItems = config.opts.ui.menu.before
    const afterMenuItems = config.opts.ui.menu.after

    // Replace `defaultValue` with whatever default value you want to use in case 'openSubMenus' is not found
function WalletNav(){
  const items =
}
    return (
      <nav styleName="nav-bg">
        <div styleName="container">
          <a href="/" styleName="logo-link">
            <Logo />
          </a>

          <div id="mega-menu-full" styleName="mega-menu">
            <ul styleName="menu-list">
              <li>
                <button id="mega-menu-full-dropdown-button" styleName="dropdown-button">
                  Wallet
                  <svg
                    styleName="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </li>
              <li>
                <button id="mega-menu-full-dropdown-button" styleName="dropdown-button">
                  Swap
                  <svg
                    styleName="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </li>
              <li>
                <button id="mega-menu-full-dropdown-button" styleName="dropdown-button">
                  Staking
                  <svg
                    styleName="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </li>
              <li>
                <a href="#" styleName="menu-item">
                  Launchpad
                </a>
              </li>
              <li>
                <a href="#" styleName="menu-item">
                  Lottery
                </a>
              </li>
              <li>
                <a href="#" styleName="menu-item">
                  NFT Music
                </a>
              </li>
              <li>
                <a href="#" styleName="menu-item">
                  Exchange
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

//@ts-ignore: strictNullChecks
export default injectIntl(Nav)
