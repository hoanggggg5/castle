import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Asset, DepositAddress } from '~/types'
import { AssetType } from '~/types'

export const useAssetsStore = defineStore({
  id: 'assets',
  state() {
    return {
      assets: ref<Asset[]>([]),
    }
  },
  getters: {
    spot_assets(): Asset[] {
      return this.assets.filter(asset => asset.type === AssetType.Spot)
    },
  },
  actions: {
    async GetAllAssets() {
      try {
        const { data: assets } = await useBetterFetch<Asset[]>('trade/account/balances')

        this.assets = assets
      } catch (error) {
        return error
      }
    },
    async FetchDepositAddress(currency_id: string, blockchain_key: string) {
      try {
        const { data } = await useBetterFetch<DepositAddress>(`trade/account/deposit_address/${currency_id}?blockchain_key=${blockchain_key}`)
        const assets = this.assets

        assets.map((a) => {
          if (data.currencies.includes(a.currency)) {
            a.deposit_addresses.push(data)
          }

          return a
        })
      } catch (error) {
        return error
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot))
