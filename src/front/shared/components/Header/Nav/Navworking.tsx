import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import { injectIntl } from 'react-intl'
import styles from './Nav.scss'
import { localisedUrl } from 'helpers/locale'
import config from 'helpers/externalConfig'

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

    return (
      <div styleName="nav">
        <div styleName="mainMenu" className="data-tut-widget-tourFinish">
          <div styleName="submenuContainer">
            <a
              href="#"
              //target={(newwindow) ? `_blank` : `_self`}
              styleName="link"
            >
              Wallet
            </a>
            <div styleName="submenu">
              <a href="http://localhost:9001/#/exchange" styleName="link">
                Cross Chain Swap
              </a>
            </div>
          </div>
          <div styleName="submenuContainer">
            <a
              href="https://strikt-swap.vercel.app/#/swap"
              //target={(newwindow) ? `_blank` : `_self`}
              styleName="link"
            >
              Swap
            </a>{' '}
            <div styleName="submenu">
              <a href="#" styleName="link">
                Swap 1
              </a>
              <a href="#" styleName="link">
                Swap 2
              </a>
            </div>{' '}
          </div>

          <a
            href="#"
            //target={(newwindow) ? `_blank` : `_self`}
            styleName="link"
          >
            Launchpad
          </a>
          <a
            href="#"
            //target={(newwindow) ? `_blank` : `_self`}
            styleName="link"
          >
            Lottery
          </a>
          <a
            href="#"
            //target={(newwindow) ? `_blank` : `_self`}
            styleName="link"
          >
            Music NFTs
          </a>
          <a
            href="#"
            //target={(newwindow) ? `_blank` : `_self`}
            styleName="link"
          >
            Exchange
          </a>
        </div>
      </div>
    )
  }
}

//@ts-ignore: strictNullChecks
export default injectIntl(Nav)
