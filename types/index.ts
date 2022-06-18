export enum Placement {
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
}

export enum UserState {
  Loading = 'loading',
  Active = 'active',
  Deleted = 'deleted',
  Pending = 'pending',
}

export enum ExchangeLayout {
  Basic = 'basic',
  Pro = 'pro',
}

export enum OrderSide {
  Buy = 'buy',
  Sell = 'sell',
}

export enum OrderType {
  Limit = 'limit',
  Market = 'market',
}

export enum OrderState {
  Pending = 'pending',
  Wait = 'wait',
  Done = 'done',
  Canceled = 'cancel',
}

export enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum Format {
  DateTime = 'datetime',
  DateTimeNoYear = 'datetime-no-year',
  Time = 'time',
  Price = 'price',
  Amount = 'amount',
  Total = 'total',
  Change = 'change',
  TickerVolume = 'ticker_volume',
}

export enum SortType {
  Number = 'Number',
  String = 'String',
}

export enum ParseType {
  DateTime = 'datetime',
  Time = 'time',
  Decimal = 'decimal',
}

export interface ZTableColumn {
  key: string
  title?: string
  class?: string
  align?: Align
  sort?: boolean
  sortBy?: SortType
  scopedSlots?: boolean
  headScopedSlots?: boolean
  formatBy?: Format
  sideKey?: string
  toUpper?: boolean
  toLower?: boolean
  hideColumn?: boolean
  parse?: ParseType
  precision?: number | ((item: any) => number)
  prefix?: string | ((item: any) => string)
  suffix?: string | ((item: any) => string)
}

export enum NoticeType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export interface NoticeOptions {
  placement?: Placement
  duration?: number
}

export interface MessageOptions extends NoticeOptions {
  message: string
}

export interface NotificationOptions extends NoticeOptions {
  title?: string
  description?: string
}

export enum WebSocketType {
  Public = 'public',
  Private = 'private',
}

export enum ChartType {
  Bars = 'bars',
  Candles = 'candles',
  Line = 'line',
  Area = 'area',
  HeikenAshi = 'heiken_ashi',
  HollowCandles = 'hollow_candles',
  Baseline = 'baseline',
  Renko = 'renko',
  Kagi = 'kagi',
  PointAndFigure = 'point_and_figure',
  LineBreak = 'line_break',
}

export enum AssetType {
  Spot = 'spot',
  Futures = 'futures', // NOT READY
  P2P = 'p2p', // NOT READY
  Convert = 'convert', // NOT READY
  Margin = 'margin', // NOT READY
}

export interface DepositAddress {
  currencies: string[]
  blockchain_key: string
  address: string
  state: string
}

export interface Asset {
  currency: string
  type: AssetType
  balance: string
  locked: string
  deposit_addresses?: DepositAddress[]
  created_at?: string
  updated_at?: string
}

export interface DisabledRule {
  key: string
  required?: boolean
}

export interface Country {
  name: string
  code: string
  timezone: string
  utc: string
  mobile_code: string
}

export enum OrdersManagerType {
  OpenOrders = 'open_orders',
  OrdersHistory = 'orders_history',
}

export type ZSelectList = {
  text: string
  key: string
}[]

export type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>

export interface PersistedStateOptions {
  /**
   * Storage key to use.
   * @default $store.id
   */
  key?: string

  /**
   * Where to store persisted state.
   * @default localStorage
   */
  storage?: StorageLike

  /**
   * Dot-notation paths to partially save state.
   * @default undefined
   */
  paths?: Array<string>

  /**
   * Overwrite initial state (patch otherwise).
   * @default false
   */
  overwrite?: boolean
}
