import ZEventBus from './ZEventBus'
import type { MessageOptions } from '~/types'
import { NoticeType, Placement } from '~/types'
import { RandomString } from '~/mixins'

const createMessage = (type: NoticeType) => {
  return (options: MessageOptions) => {
    const key = RandomString()

    if (!options.placement) options.placement = Placement.TopCenter

    const App = defineComponent({
      key: `${key}-${options.placement}`,
      setup() {
        let closeTimeout: NodeJS.Timeout

        function close() {
          clearTimeout(closeTimeout)

          ZEventBus.emit('z-remove-message', `${key}-${options.placement}`)
        }

        onMounted(() => {
          closeTimeout = setTimeout(() => {
            close()
          }, options.duration || 3500)
        })

        let icon_class
        switch (type) {
          case NoticeType.Success:
            icon_class = 'text-up'
            break
          case NoticeType.Warn:
            icon_class = 'text-warn'
            break
          case NoticeType.Error:
            icon_class = 'text-down'
            break
        }

        return () => (
          <div class={['z-message', `z-message-${options.placement}`]}>
            <div class={['z-message-icon', icon_class]}>
              <i class={`z-icon-${type}`} />
            </div>
            <div class="z-message-content">
              { options.message }
            </div>
          </div>
        )
      },
    })

    ZEventBus.emit('z-new-message', App)
  }
}

type MessageApi = { [key in NoticeType]: (options: MessageOptions) => void }

const lstMessage: MessageApi = {} as MessageApi

for (const type in NoticeType) {
  lstMessage[type.toLowerCase() as NoticeType] = createMessage(type.toLowerCase() as NoticeType)
}

export default lstMessage
