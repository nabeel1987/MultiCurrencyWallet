import cx from 'classnames'
import { isMobile } from 'react-device-detect'
import { FormattedMessage } from 'react-intl'
import { links } from 'helpers'

import config from 'helpers/externalConfig'

import CSSModules from 'react-css-modules'
import version from 'helpers/version'
import WidthContainer from 'components/layout/WidthContainer/WidthContainer'
import styles from './Footer.scss'

import SocialMenu from './SocialMenu/SocialMenu'
import SwitchLang from './SwitchLang/SwitchLang'
import ServiceLinks from './ServiceLinks'

function Footer() {
  const showServiceLinks = !config.opts.ui.hideServiceLinks

  return <></>
}

export default CSSModules(Footer, styles, { allowMultiple: true })
