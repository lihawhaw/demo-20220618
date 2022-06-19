import { Checkbox, Drawer, Form, Select } from 'antd'
import { FormAggregationRule } from 'components/publiclog/agg-rule'
import FormFieldRuleTable from 'components/publiclog/field-rule'
import { observer } from 'mobx-react'
import React from 'react'
import { publicLogModalStore } from 'store/publiclog-drawer'
import './publiclog-rule.less'

@observer
export class PublicLogRuleConfig extends React.Component {
  public componentDidMount(): void {
    publicLogModalStore.fetchPublicKeys()
  }

  public RenderTitle = (): JSX.Element => {
    return <>新建Pubic Key规则</>
  }
  public render() {
    const RenderTitle = this.RenderTitle

    return (
      <Drawer className='public-rule-wrapper' visible={true} width={896} title={<RenderTitle />}>
        <Form>
          <div className='config-title'>规则配置</div>
          <div className='rule-key'>
            <label className='label'>选择关联key：</label>
            <Select
              className='w240'
              options={publicLogModalStore.publicKeyList.map((item) => ({ label: item, value: item }))}
              placeholder='请选择'
              value={publicLogModalStore.entityKey}
              onChange={publicLogModalStore.setEntityKey}
            />
            <span className='desc'>从已创建了同步采集任务的key中选择</span>
          </div>
          <div className='rule-schema'>
            <label className='label'>schema规则：</label>
            <Checkbox />
            <span className='desc'>检查日志打印字段是否有缺少</span>
          </div>
          <div className='rule-field-title'>配置字段规则:</div>
          <div className='rule-field-table'></div>
          <Form.Item name='streamFieldRules'>
            <FormFieldRuleTable />
          </Form.Item>
          <div className='rule-field-title'>配置聚合规则:</div>
          <div></div>
          <Form.Item name='streamAggRules'>
            <FormAggregationRule />
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}
