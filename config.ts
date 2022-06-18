import { ChartType, ExchangeLayout } from '~/types'

const production_url = process.env?.API_URL || 'https://test.zsmartex.tech'

function getUrl(ws: boolean) {
  if (process.client) {
    if (ws) {
      return window.location.protocol === 'https:' ? `wss://${window.location.host}/api/v2/websocket/` : `ws://${window.location.host}/api/v2/websocket/`
    }

    return process.env.NODE_ENV === 'production' ? `${window.location.origin}/api/v2/` : `http://${window.location.host}/api/v2/`
  } else {
    return `${production_url}/api/v2/`
  }
}

export default {
  production_url,
  name: 'ZSmartex',
  default_market: 'ethusdt',
  default_exchange_layout: ExchangeLayout.Basic,
  default_chart_interval: '15',
  default_chart_type: ChartType.Candles,
  home_page_feature_markets: ['ethusdt', 'btcusdt', 'ethusdt', 'btcusdt', 'ethusdt'], // limit at 5
  markets_page_feature_markets: ['ethusdt', 'btcusdt', 'ethusdt', 'btcusdt'], // limit at 4
  quote_list: ['usdt', 'eth', 'btc', 'bnb', 'trx', 'test1', 'test2'], // no limit
  api: {
    url: getUrl(false),
    ws: getUrl(true),
  },
  page_rules: [
    {
      header: true,
      name: '*',
      footer: true,
    },
    {
      header: true,
      name: 'exchange',
      footer: true,
    },
    {
      header: true,
      name: 'login',
      footer: false,
    },
    {
      header: true,
      name: 'register',
      footer: false,
    },
    {
      header: true,
      name: 'confirm-email',
      footer: false,
    },
    {
      header: true,
      name: 'forgot-password',
      footer: false,
    },
    {
      header: true,
      name: 'reset-password',
      footer: false,
    },
  ],
}
