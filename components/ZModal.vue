<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-property-decorator'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

@Options({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
})
export default class MyClass extends Vue {
  @Prop() readonly title!: string

  @Model('modelValue') visible!: boolean
}
</script>

<template>
  <TransitionRoot as="template" :show="visible">
    <Dialog as="div" class="z-modal fixed z-10 inset-0 overflow-y-auto" @close="visible = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0 -translate-y-60/100"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0 -translate-y-60/100"
        >
          <ZOverlay class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all top-2/4 -translate-y-2/4 -translate-x-2/4">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle as="h3" class="text-2xl text-center leading-6 font-medium text-gray-900">
                {{ title }}
              </DialogTitle>
              <div class="mt-6">
                <slot />
              </div>
            </div>
          </ZOverlay>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="less">
.z-modal {
}
</style>
