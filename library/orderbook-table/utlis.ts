import { isObject } from '~/mixins'

export default {
  createCanvas(height: number, width: number, parent_element: HTMLElement | Element) {
    const canvas = document.createElement('canvas')

    canvas.height = height
    canvas.width = width
    canvas.style.height = `${height}px`
    canvas.style.width = `${width}px`

    parent_element.appendChild(canvas)

    return canvas
  },
  resizeCanvas(canvas: HTMLCanvasElement, height: number, width: number, callback?: () => void) {
    const context = canvas.getContext('2d')
    const pixelRatio = this.getPixelRatio(context)

    context?.resetTransform()

    canvas.height = height * pixelRatio
    canvas.style.height = `${height}px`
    canvas.style.width = `${width}px`
    canvas.width = width * pixelRatio
    canvas.style.height = `${height}px`
    canvas.style.width = `${width}px`

    context?.scale(pixelRatio, pixelRatio)

    if (typeof callback === 'function') callback()
  },
  getPixelRatio(ctx: any) {
    const backingStore = ctx.backingStorePixelRatio
      || ctx.webkitBackingStorePixelRatio
      || ctx.mozBackingStorePixelRatio
      || ctx.msBackingStorePixelRatio
      || ctx.oBackingStorePixelRatio
      || ctx.backingStorePixelRatio || 1
    return (window.devicePixelRatio || 1) / backingStore
  },
  getContext2D(element: HTMLCanvasElement) {
    if (element) {
      const context = element.getContext('2d')

      return context
    }

    return null
  },
  clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    const w = canvas.width
    canvas.width = 0
    canvas.width = w
  },
  merge(target: any, source: any) {
    if (!isObject(target) || !isObject(source)) {
      return
    }

    for (const key in source) {
      if (Object.prototype.isPrototypeOf.call(target, key)) {
        const targetProp = target[key]
        const sourceProp = source[key]

        if (isObject(sourceProp) && isObject(targetProp) && !Array.isArray(sourceProp) && !Array.isArray(targetProp)) {
          this.merge(targetProp, sourceProp)
        }
        else if (source[key] || source[key] === 0 || source[key] === false) {
          target[key] = source[key]
        }
      }
    }

    return target
  },
}
