// import { getPublicLogFields, getPublicLogKeys } from 'lib/api'
import { action, computed, observable } from 'mobx'
import { IPublicLogFieldsItem, IStreamAggRules, IStreamAlarmVO } from 'types/publiclog'
import { uuid } from 'utils'

class publicLogModal {
  @observable
  public entityKey: string
  @observable
  public streamAlarmVO: IStreamAlarmVO
  @observable
  public streamEntityId: number = null
  @observable
  public publicKeyList: string[] = []
  @observable
  public publicFields: IPublicLogFieldsItem[] = []

  @action.bound
  public setEntityKey(key: string) {
    this.entityKey = key
    this.fetchPublicFields(key)
  }
  @action.bound
  public setStreamEntityId(id: number) {
    this.streamEntityId = id
  }
  @action.bound
  public setPublicKeyList(keys: string[]) {
    this.publicKeyList = keys
  }
  @action.bound
  public setPublicFields(fields: IPublicLogFieldsItem[]) {
    this.publicFields = fields
  }

  @observable
  public streamAggRules: IStreamAggRules[] = []

  @computed
  public get streamAggRulesData() {
    if (this.streamAggRules.length === 0) return [{ key: uuid() }] as IStreamAggRules[]
    return this.streamAggRules
  }

  fetchPublicKeys() {
    // getPublicLogKeys().then(this.setPublicKeyList)
  }
  fetchPublicFields(entityKey: string) {
    // getPublicLogFields(entityKey).then(this.setPublicFields)
  }
}

export const publicLogModalStore = new publicLogModal()
