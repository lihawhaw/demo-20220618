import { Button, Input, Select } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import { publicLogModalStore } from 'store/publiclog-drawer'
import { IStreamAggRules } from 'types/publiclog'
import './style.less'

@observer
export class FormAggregationRule extends React.Component {
  public render() {
    const { streamAggRulesData } = publicLogModalStore
    return (
      <div className='agg-rule'>
        {streamAggRulesData.map((item) => {
          return <AggItem key={item.key} {...item} />
        })}
        <Button type='link'>添加聚合规则</Button>
      </div>
    )
  }
}

@observer
export class AggItem extends React.Component<IStreamAggRules> {
  render() {
    const { otherCondition } = this.props
    if (!otherCondition?.length) return <AggItemMultipleRule {...this.props} />
    return <AggItemSingleRule {...this.props} />
  }
}

@observer
export class AggItemActions extends React.Component<{ onAdd?: () => void; onSubtract?: () => void }> {
  render() {
    return (
      <div className='item-actions'>
        <div className='subtract' onClick={this.props.onSubtract}>
          -
        </div>
        <div className='add' onClick={this.props.onAdd}>
          +
        </div>
      </div>
    )
  }
}

@observer
export class AggItemSingleRule extends React.Component<IStreamAggRules> {
  render() {
    return (
      <div className='agg-item'>
        <div className='condition single'>
          <label className='label'>条件:</label>
          <Select
            className='field'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
          <Select
            className='operator'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
          <Input className='ipt' />
          <AggItemActions />
        </div>
        <div className='divider'></div>
        <div className='judge'>
          <label className='label'>判断:</label>
          <Select
            className='field'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
          <Select
            className='operator'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
        </div>
      </div>
    )
  }
}

@observer
export class AggItemMultipleRule extends React.Component<IStreamAggRules> {
  render() {
    return (
      <div className='agg-item'>
        <div className='label'>条件:</div>

        <div className='condition multiple'>
          <div className='left-action'>
            <Select
              options={[
                { label: '且', value: 'and' },
                { label: '或', value: 'or' },
              ]}
            />
            <div className='connected-line'></div>
            <div className='connected-curves'></div>
          </div>
          <div className='right-wrap'>
            <div className='item'>
              <Select
                className='field'
                options={publicLogModalStore.publicFields.map((item) => ({
                  label: item.name,
                  value: `${item.name}||${item.type}`,
                }))}
              />
              <Select
                className='operator'
                options={publicLogModalStore.publicFields.map((item) => ({
                  label: item.name,
                  value: `${item.name}||${item.type}`,
                }))}
              />
              <Input className='ipt' />
              <AggItemActions />
            </div>
            <div className='item'>
              <Select
                className='field'
                options={publicLogModalStore.publicFields.map((item) => ({
                  label: item.name,
                  value: `${item.name}||${item.type}`,
                }))}
              />
              <Select
                className='operator'
                options={publicLogModalStore.publicFields.map((item) => ({
                  label: item.name,
                  value: `${item.name}||${item.type}`,
                }))}
              />
              <Input className='ipt' />
              <AggItemActions />
            </div>
          </div>
        </div>

        <div className='divider'></div>

        <div className='judge'>
          <label className='label'>判断:</label>
          <Select
            className='field'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
          <Select
            className='operator'
            options={publicLogModalStore.publicFields.map((item) => ({
              label: item.name,
              value: `${item.name}||${item.type}`,
            }))}
          />
        </div>
      </div>
    )
  }
}
