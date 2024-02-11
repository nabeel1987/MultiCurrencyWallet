import * as React from 'react'
import { useState } from 'react'
import { connect } from 'redaction'

import Swiper from 'swiper'
import 'swiper/css/bundle'
import config from 'helpers/externalConfig'

import { constants, getItezUrl } from 'helpers'
import actions from 'redux/actions'
import axios from 'axios'
import security from '../images/security.svg'
import styles from '../NotityBlock/NotifyBlock.scss'
import NotifyBlock from '../NotityBlock/NotifyBlock'
import ContentLoader from 'components/loaders/ContentLoader/ContentLoader'
import { FormattedMessage, injectIntl } from 'react-intl'
import linksManager from 'helpers/links'
import Button from 'components/controls/Button/Button'

const disableInternalWallet = config?.opts?.ui?.disableInternalWallet ? true : false

type WallerSliderProps = {
  intl?: { [key: string]: any }
  user?: { [key: string]: any }
  multisigPendingCount: number
}

type WallerSliderState = {
  mnemonicDeleted: boolean
  isFetching: boolean
  metamaskConnected: boolean
  banners?: any[]
}

@connect(({ user }) => ({ user }))
class WallerSlider extends React.Component<WallerSliderProps, WallerSliderState> {
  _mounted = false

  constructor(props) {
    super(props)

    const mnemonic = localStorage.getItem(constants.privateKeyNames.twentywords)
    const mnemonicDeleted = mnemonic === '-'
    this.state = {
      mnemonicDeleted,
      isFetching: false,
      metamaskConnected: false,
    }
  }

  componentDidMount() {
    this._mounted = true
    this.getBanners()
  }

  componentWillUnmount() {
    this._mounted = false
  }

  initBanners = () => {
    let starterSwiper = new Swiper('#swiper_banners', {
      spaceBetween: 10,
      slidesPerView: 4,
      // centeredSlides: true,
      // loop: true,
      // Responsive breakpoints
      breakpoints: {
        480: {
          slidesPerView: 3,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    })
  }

  processItezBanner = (inBanners) => {
    const {
      user,
      //@ts-ignore: strictNullChecks
      intl: { locale: intlLocale },
    } = this.props

    let locale = intlLocale

    if (!locale) locale = `en`

    const oldItezUrl = 'https://itez.swaponline.io/'
    const newItezUrl = 'https://buy.itez.com/swaponline/'

    const banners = inBanners
      .map((el) => {
        let bannerUrl = el[4]
        if (bannerUrl.includes(oldItezUrl)) {
          bannerUrl = bannerUrl.replace(oldItezUrl, newItezUrl)
          const bannerArr = [...el]
          bannerArr.splice(4, 1, getItezUrl({ user, locale, url: bannerUrl }))

          return bannerArr
        }
        return el
      })
      .filter((el) => el && el.length)
    return banners
  }

  getBanners = () => {
    if (window && window.bannersOnMainPage !== undefined) {
      // Используем банеры, которые были определены в index.html (используется в виджете вордпресса)
      const widgetBanners = window.bannersOnMainPage.length ? window.bannersOnMainPage : []

      if (!this._mounted) return

      this.setState(
        () => ({
          banners: this.processItezBanner(widgetBanners).filter((el) => el && el.length),
          isFetching: true,
        }),
        () => this.initBanners()
      )
    } else {
      try {
        const bannersSource = config.opts.ui.bannersSource
        return axios
          .get(bannersSource)
          .then(({ data }) => {
            const banners = this.processItezBanner(data).filter((el) => el && el.length)

            if (!this._mounted) return

            this.setState(
              () => ({
                banners,
                isFetching: true,
              }),
              () => this.initBanners()
            )
          })
          .catch((error) => {
            console.error('getBanners:', error)
          })
      } catch (error) {
        console.error(error)
      }
    }
    return null
  }

  handleShowKeys = () => {
    actions.modals.open(constants.modals.DownloadModal)
  }

  handleSaveKeys = () => {
    actions.modals.open(constants.modals.PrivateKeys)
  }

  handleShowMnemonic = () => {
    //@ts-ignore: strictNullChecks
    actions.modals.open(constants.modals.SaveWalletSelectMethod, {
      onClose: () => {
        const mnemonic = localStorage.getItem(constants.privateKeyNames.twentywords)
        const mnemonicDeleted = mnemonic === '-'
        this.setState({
          mnemonicDeleted,
        })
      },
    })
  }

  handleGoToMultisigRequest = () => {
    actions.multisigTx.goToLastWallet()
  }

  render() {
    const { mnemonicDeleted, banners } = this.state
    const { multisigPendingCount } = this.props

    const isPrivateKeysSaved = localStorage.getItem(constants.localStorage.privateKeysSaved)

    const needSignMultisig = (
      <FormattedMessage
        id="Banner_YouAreHaveNotSignegTx"
        defaultMessage="{count} multisig transaction is waiting for your confirmation"
        values={{
          count: multisigPendingCount,
        }}
      />
    )

    return window.location.hash !== linksManager.hashHome ? null : (
      <div className="data-tut-banners">
        <h3 className={`${styles.bannersHeading}`}>
          <FormattedMessage id="ForYou" defaultMessage="For you" />
        </h3>
        {!this.state.isFetching ? (
          //@ts-ignore
          <ContentLoader banners />
        ) : (
          <div
            id="swiper_banners"
            className={`swiper ${styles.swiperContainer}`}
            style={{ marginTop: '20px', marginBottom: '30px', overflow: 'hidden' }}
          >
            <div className="swiper-wrapper">
              {multisigPendingCount > 0 && (
                <div className="swiper-slide">
                  <NotifyBlock
                    className="notifyIncomeRequest"
                    background="129218"
                    text={needSignMultisig}
                    feedbackText={`BTC multisig`}
                    onPress={this.handleGoToMultisigRequest}
                  />
                </div>
              )}
              {!isPrivateKeysSaved && !mnemonicDeleted && !disableInternalWallet && (
                <div
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: ' 8px',
                    minHeight: '67px',
                    fontSize: '14px',
                    width: '100%',
                    marginRight: ' 20px',
                  }}
                >
                  <NotifyBlock
                    className="notifyBlockSaveKeys"
                    //   icon={security}
                    text={
                      <FormattedMessage
                        id="ShowMyMnemonic_copy"
                        defaultMessage="Please backup your wallet"
                      />
                    }
                    feedbackText={`Save mnemonic`}
                    onPress={mnemonicDeleted ? this.handleShowKeys : this.handleShowMnemonic}
                  />
                </div>
              )}{' '}
              <button
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius: ' 8px',
                  minHeight: '67px',
                  height: '100%',
                  fontSize: '14px',
                  width: '100%',
                  marginRight: ' 20px',
                }}
                id="Buy_Bitcoin"
                onClick={() => (window.location.href = 'https://buy.itez.com/swaponline')}
              >
                <FormattedMessage id="Buy BitCoin" defaultMessage="Buy BitCoin" />
              </button>
              <QuestionMarkWithPopup />
              {/*
              {banners &&
                banners.length > 0 &&
                banners.map(
                  (banner, index) =>
                    index < 3 && (
                      <div key={index} className="swiper-slide">
                        <NotifyBlock
                          //   background={`${banner[3]}`}
                          //  icon={banner[5]}
                          text={banner[2]}
                          link={banner[4]}
                        />
                      </div>
                    )
                    )} */}
            </div>
          </div>
        )}
      </div>
    )
  }
}
const QuestionMarkWithPopup = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {' '}
      <button
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          borderRadius: ' 8px',
          minHeight: '67px',
          height: '100%',
          fontSize: '14px',
          width: '100%',
        }}
        onClick={() => (window.location.href = 'http://localhost:9001/#/createWallet')}
      >
        {!isHovered && <FormattedMessage id="wal" defaultMessage="Create Wallet" />}
      </button>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered && (
          <svg
            style={{
              position: 'absolute',
              top: '25px',
              right: '20px',
              width: '20px',
              height: '20px',
              verticalAlign: 'middle',
              fill: 'currentColor',
              overflow: 'hidden',
            }}
            viewBox="0 0 1024 1024"
            id="Layer_1"
            data-name="Layer 1"
          >
            <path d="M511.51,63.89C397,63.89,282.45,107.4,194.79,195.06c-174.67,174.68-174.67,458.77,0,633.44C282.45,916.16,397,959.67,511.51,959.67S740.58,916.16,828.23,828.5c174.68-174.67,174.68-458.76,0-633.44C740.58,107.4,626.05,63.89,511.51,63.89Zm0,44.79a407.45,407.45,0,0,1,151.65,29.44c49.9,20.47,94.69,49.9,133.08,88.93,39,38.39,68.46,83.18,88.94,133.09a405.38,405.38,0,0,1,0,303.28c-20.47,49.91-49.91,94.7-88.94,133.09-38.39,39-83.18,68.46-133.08,88.94a405.41,405.41,0,0,1-303.29,0C310,865,265.18,835.54,226.79,796.51c-39-38.39-68.47-83.18-88.94-133.09a405.38,405.38,0,0,1,0-303.28c20.47-49.91,49.91-94.7,88.94-133.09,38.39-39,83.18-68.46,133.08-88.93A407.44,407.44,0,0,1,511.51,108.68Z" />
            <path d="M511.51,674.3A34.82,34.82,0,0,0,477,708.85c0,18.56,16,33.91,34.55,33.91,19.2,0,34.55-15.35,34.55-33.91A34.4,34.4,0,0,0,511.51,674.3Zm.64-393.5c-42.23,0-76.14,10.88-101.73,33.91-25.59,22.39-41.59,55-46.71,97.9l58.23,7c4.48-32,15.35-55.66,31.35-70.38,16-15.35,35.83-22.39,59.51-22.39q37.43,0,63.34,24.95,24.95,24,25,57.59a67.6,67.6,0,0,1-8.32,33.27C587,452.92,574.22,466.35,555,483.63c-19.83,17.27-33.27,30.07-40.95,39-9.59,12.16-17.27,24.31-21.75,36.47-6.4,16-9.6,35.19-9.6,57l.64,17.27h53.75c.64-22.39,1.92-39,4.48-48.63,3.2-10.23,7-19.19,12.79-26.87S571.66,538,590.21,522c26.88-24.31,45.43-44.79,55-61.43a115.25,115.25,0,0,0,14.08-55q0-51.82-40.31-88.3C592.77,293,556.94,280.8,512.15,280.8Z" />
          </svg>
        )}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              width: '200px',
              right: '0',
              //backgroundColor: 'white',
              //border: '1px solid black',
              padding: '10px',
              fontSize: '11px',
              borderRadius: '5px',
            }}
          >
            It will only work if you disconnect your current Meta Mask account
          </div>
        )}
      </div>
    </>
  )
}
export default injectIntl(WallerSlider)
