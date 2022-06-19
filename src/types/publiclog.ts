export interface IStreamRuleConfig {
  // 规则实体 id
  streamEntityId?: number
  streamAlarmVO: IStreamAlarmVO
  streamRuleContent: IStreamRuleContent
}

export interface IStreamAlarmVO {
  alarmGroup: string // 告警组
  alarmMethod: ALARM_METHOD
  alarmValue: number // 告警阙值
  dcEnable: 1 | 0 // 开启dc告警
  mailEnable: 1 | 0 // 开启mail告警
  phoneEnable: 1 | 0 // 开启电话告警
  streamEntityId: number // 规则实体的id
}

// 告警触发方法 ratio : 占比  count : 总条数
export enum ALARM_METHOD {
  RATIO = 'ratio',
  COUNT = 'count',
}

export interface IStreamRuleContent {
  entityKey: string // public log key
  schemaOpen: true // 是否开启schema校验
  streamAggRules: IStreamAggRules[]
  streamFieldRules: IStreamFieldRules[]
}

export interface IStreamAggRules {
  key: string
  baseCondition: {
    field: string // 字段
    operand: string // 值
    operator: string // 操作符， 同原本dqc
  }
  otherCondition: IOtherCondition[]
  resultField: string
  resultMethod: string
  resultOperator?: string // 预留 不用传
  resultOperand1?: string
  resultOperand2?: string
}

export interface IStreamFieldRules {
  key: string
  field?: string // 字段名称
  method?: 'stream_range' // 字段方法  streamNull(空), streamEnum(枚举), streamRange(阙值), streamRegex(正则)
  operand1?: string // 字段值1
  operand2?: string // 字段值2
  operator?: string // 预留设计 可以不传
}

export interface IOtherCondition {
  condition: 'and' | 'or' // 条件  and  , or
  conditionName: '且' | '或' // 条件的中文
  field: string // 下面同上
  operand: string
  operator?: string
}

export interface IPublicLogFieldsItem {
  name: string
  type: string
  comment: string // 前端可忽略
}
