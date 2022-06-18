import Canvas from './canvas'
import type { Config, Row } from './config'
import utlis from './utlis'
import colors from '@/colors'

class OrderBookTable {
  config!: Config
  canvas!: Canvas
  data: Row[] = []
  element: HTMLElement

  constructor(element: HTMLElement, config?: Config) {
    this.element = element

    if (config) this.config = config
  }

  init() {
    this.canvas = new Canvas(this.element as HTMLElement, this.config.height, this.config.width)
  }

  setData(data: Row[]) {
    this.data = data
  }

  async draw_table() {
    const context = this.canvas.context
    utlis.clearCanvas(context, this.canvas.canvas)

    for (let index = 0; index < this.data.length; index++) {
      const row = this.data[index]
      const y = (index) * this.config.line_height

      fillRect(
        context,
        0,
        y,
        row.backgroundWidth,
        this.config.line_height,
        row.backgroundColor,
      )

      for await (const column of this.config.columns) {
        const x = column.x

        context.beginPath()
        context.font = `500 ${column.fontSize}px URWDIN-Regular`
        context.fillStyle = row.change || row.removing ? colors['exchange-gray-color'] : column.color
        context.textAlign = column.align
        context.fillText(row.fake ? '---' : row.depth_row[column.key].toString(), x, y + 10 + 5)
        context.closePath()
      }

      // TODO: Work with open orders
      // if (TradeController.open_orders.findPrice(row.price)) {
      //   context.beginPath();
      //   context.fillStyle = colors["blue-color"];
      //   context.arc(8, y + this.config.line_height / 2, 3, 0, Math.PI*2, true);
      //   context.fill();
      //   context.closePath();
      // }
    }
  }
}

function fillRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  context.beginPath()
  context.clearRect(x, y, 320, height)
  context.fillStyle = color
  context.fillRect(x, y, width, height)
  context.closePath()
}

export default OrderBookTable
