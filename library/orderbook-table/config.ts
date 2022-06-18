export interface Column {
  key: 'price' | 'amount' | 'total'
  color: string
  fontSize: number
  align: 'left' | 'center' | 'right'
  x: number
}

export interface Config {
  height: number
  width: number
  line_height: number
  columns: Column[]
}

export interface Row {
  depth_row: {
    price: string
    amount: string
    total: string
  }

  fake?: boolean
  change?: boolean
  removing?: boolean
  backgroundColor: string
  backgroundWidth: number
}
