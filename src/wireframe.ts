import StoreManager from './utils/StoreManager'

import APIClient from './data/APIClient'
import LocalStorage from './utils/LocalStorage'

import itemsViewerModule from './domain/itemsViewer'

import rootNavigationModule from './presentation/rootNavigation'
import rootContainerModule from './presentation/rootContainer'
import mainFlowModule from './presentation/mainFlow'

import config from './config'

export default function() {
  const storeManager = new StoreManager()

  // Data
  const api = new APIClient(config.baseUrl)
  const localStorage = new LocalStorage(config.storageName)
  const data = {
    api,
    localStorage
  }

  // Domain
  const itemsViewer = itemsViewerModule(storeManager)
  const domain = {
    itemsViewer
  }

  // Presentation
  const mainFlow = mainFlowModule(domain.itemsViewer)
  const rootNavigation = rootNavigationModule(storeManager, mainFlow)
  const rootContainer = rootContainerModule(storeManager, rootNavigation)
  const presentation = {
    rootContainer
  }

  return {
    storeManager,
    data,
    domain,
    presentation
  }
}
