export const COIN_TYPE = Object.freeze({
  NATIVE: 'NATIVE',
  ETH_TOKEN: 'ETH_TOKEN',
  BNB_TOKEN: 'BNB_TOKEN',
  MATIC_TOKEN: 'MATIC_TOKEN',
  XDAI_TOKEN: 'XDAI_TOKEN',
  FTM_TOKEN: 'FTM_TOKEN',
  AVAX_TOKEN: 'AVAX_TOKEN',
  MOVR_TOKEN: 'MOVR_TOKEN',
  ONE_TOKEN: 'ONE_TOKEN',
  AME_TOKEN: 'AME_TOKEN',
  AURORA_TOKEN: 'AURORA_TOKEN',
  PHI_V1_TOKEN: 'PHI_V1_TOKEN',
  PHI_TOKEN: 'PHI_TOKEN',
  FKW_TOKEN: 'FKW_TOKEN',
})

export const TOKEN_STANDARD = Object.freeze({
  ERC20: 'ERC20',
  BEP20: 'BEP20',
  ERC20MATIC: 'ERC20MATIC',
  ERC20XDAI: 'ERC20XDAI',
  ERC20FTM: 'ERC20FTM',
  ERC20AVAX: 'ERC20AVAX',
  ERC20MOVR: 'ERC20MOVR',
  ERC20ONE: 'ERC20ONE',
  ERC20AME: 'ERC20AME',
  ERC20AURORA: 'ERC20AURORA',
  PHI20_V1: 'PHI20_V1',
  PHI20: 'PHI20',
  FKW20: 'FKW20',
})

export const BLOCKCHAIN = Object.freeze({
  BTC: 'BTC',
  GHOST: 'GHOST',
  NEXT: 'NEXT',
  ETH: 'ETH',
  BNB: 'BNB', // TODO: rename with BSC
  MATIC: 'MATIC',
  ARBITRUM: 'ARBITRUM',
  XDAI: 'XDAI',
  FTM: 'FTM',
  AVAX: 'AVAX',
  MOVR: 'MOVR',
  ONE: 'ONE',
  AME: 'AME',
  AURETH: 'AURETH', // AURORA
  PHI_V1: 'PHI_V1',
  PHI: 'PHI',
  FKW: 'FKW',
})

export const BASE_TOKEN_CURRENCY = Object.freeze({
  ETH: 'ETH',
  BNB: 'BNB',
  MATIC: 'MATIC',
  XDAI: 'XDAI',
  FTM: 'FTM',
  AVAX: 'AVAX',
  MOVR: 'MOVR',
  ONE: 'ONE',
  AME: 'AME',
  AURETH: 'AURETH',
  PHI_V1: 'PHI_V1',
  PHI: 'PHI',
  FKW: 'FKW',
})

export const COIN_MODEL = Object.freeze({
  UTXO: 'UTXO', // Unspent Transaction Outputs model
  AB: 'AB' // Account/Balance model
})

export const COIN_DATA = {
  BTC: {
    ticker: 'BTC',
    name: 'Bitcoin',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.BTC,
    model: COIN_MODEL.UTXO,
    precision: 8,
  },
  ETH: {
    ticker: 'ETH',
    name: 'Ethereum',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.ETH,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  BNB: {
    ticker: 'BNB',
    name: 'Binance Coin',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.BNB,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  MATIC: {
    ticker: 'MATIC',
    name: 'MATIC Token',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.MATIC,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  ARBETH: {
    ticker: 'ARBETH',
    name: 'Arbitrum ETH',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.ARBITRUM,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  AURETH: {
    ticker: 'AURETH',
    name: 'Aurora ETH',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.AURETH,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  XDAI: {
    ticker: 'XDAI',
    name: 'xDai',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.XDAI,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  FTM: {
    ticker: 'FTM',
    name: 'Fantom',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.FTM,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  AVAX: {
    ticker: 'AVAX',
    name: 'Avalanche',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.AVAX,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  MOVR: {
    ticker: 'MOVR',
    name: 'Moonriver',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.MOVR,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  ONE: {
    ticker: 'ONE',
    name: 'Harmony One',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.ONE,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  AME: {
    ticker: 'AME',
    name: 'AME',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.AME,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  PHI_V1: {
    ticker: 'PHI_V1',
    name: 'PHI_V1',
    type: COIN_TYPE.PHI_V1_TOKEN,
    blockchain: BLOCKCHAIN.PHI_V1,
    standard: TOKEN_STANDARD.PHI20_V1,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  PHI: {
    ticker: 'PHI',
    name: 'PHI',
    type: COIN_TYPE.PHI_TOKEN,
    blockchain: BLOCKCHAIN.PHI,
    standard: TOKEN_STANDARD.PHI20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  FKW: {
    ticker: 'FKW',
    name: 'FKW',
    type: COIN_TYPE.FKW_TOKEN,
    blockchain: BLOCKCHAIN.FKW,
    standard: TOKEN_STANDARD.FKW20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  USDT: {
    ticker: 'USDT',
    name: 'Tether',
    type: COIN_TYPE.ETH_TOKEN,
    blockchain: BLOCKCHAIN.ETH,
    standard: TOKEN_STANDARD.ERC20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  BTCB: {
    ticker: 'BTCB',
    name: 'BTCB Token',
    type: COIN_TYPE.BNB_TOKEN,
    blockchain: BLOCKCHAIN.BNB,
    standard: TOKEN_STANDARD.BEP20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  EURS: {
    ticker: 'EURS',
    name: 'STASIS EURO',
    type: COIN_TYPE.ETH_TOKEN,
    blockchain: BLOCKCHAIN.ETH,
    standard: TOKEN_STANDARD.ERC20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  GHOST: {
    ticker: 'GHOST',
    name: 'Ghost',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.GHOST,
    model: COIN_MODEL.UTXO,
    precision: 8,
  },
  NEXT: {
    ticker: 'NEXT',
    name: 'NEXT.coin',
    type: COIN_TYPE.NATIVE,
    blockchain: BLOCKCHAIN.NEXT,
    model: COIN_MODEL.UTXO,
    precision: 8,
  },
  SWAP: {
    ticker: 'SWAP',
    name: 'SWAP',
    type: COIN_TYPE.ETH_TOKEN,
    blockchain: BLOCKCHAIN.ETH,
    standard: TOKEN_STANDARD.ERC20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
  SNM: {
    ticker: 'SONM',
    name: 'SWAP',
    type: COIN_TYPE.ETH_TOKEN,
    blockchain: BLOCKCHAIN.ETH,
    standard: TOKEN_STANDARD.ERC20,
    model: COIN_MODEL.AB,
    precision: 18,
  },
}


// todo: move to COIN_DATA

export const NATIVE = {
  btc: 'BTC',
  eth: 'ETH',
  bnb: 'BNB',
  matic: 'MATIC',
  arbeth: 'ARBETH',
  aureth: 'AURETH',
  xdai: 'XDAI',
  ftm: 'FTM',
  avax: 'AVAX',
  movr: 'MOVR',
  one: 'ONE',
  ame: 'AME',
  phi_v1: 'PHI_V1',
  phi: 'PHI',
  fkw: 'FKW',
  ghost: 'GHOST',
  next: 'NEXT',
}

export const BNB_TOKENS = {
  btcb: 'BTCB',
}

export const MATIC_TOKENS = {
  wbtc: 'WBTC',
}

export const ETH_TOKENS = {
  usdt: '{ETH}USDT',
  eurs: '{ETH}EURS',
  swap: '{ETH}SWAP',
  pay: '{ETH}PAY',

  // needs for the front
  proxima: '{ETH}PROXIMA',
  snm: '{ETH}SNM',
  noxon: '{ETH}NOXON',
  pbl: '{ETH}PBL',
  xsat: '{ETH}XSAT',
  hdp: '{ETH}HDP',
  scro: '{ETH}SCRO',
  xeur: '{ETH}XEUR',

}

export default {
  ...NATIVE,
  ...ETH_TOKENS,
  ...BNB_TOKENS,
  ...MATIC_TOKENS,
  ...COIN_DATA,
}
