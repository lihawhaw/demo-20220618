import { Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { IStreamFieldRules } from 'types/publiclog'
import './style.less'

interface Props {
  value?: IStreamFieldRules[]
  onChange?: (value: IStreamFieldRules[]) => void
}

function FormFieldRuleTable(props: Props) {
  const { value, onChange } = props

  const addItem = useCallback(() => {
    const key = `${Math.random()}`.slice(2)
    onChange?.([{ key }])
  }, [value])

  useEffect(() => {
    if (!value?.length) {
      addItem()
    }
  }, [])

  const columns = useMemo<ColumnsType<IStreamFieldRules>>(() => {
    return [
      {
        title: '选择字段',
        className: 'filed-column',
        render: () => {
          return <Select options={[]} />
        },
      },
      {
        title: '选择规则',
        className: 'rule-column',
        render: () => {
          return <Select options={[]} />
        },
      },
      {
        title: '触发项',
        className: 'filed-column',
        render: () => {
          return <Select options={[]} />
        },
      },
      {
        title: '操作',
        className: 'filed-column',
        render: () => {
          return (
            <div>
              <div>-</div>
              <div onClick={addItem}>+</div>
            </div>
          )
        },
      },
    ]
  }, [])

  if (!value?.length) return <Table columns={columns} dataSource={[]} loading={true} />

  return <Table className='field-rule-table' columns={columns} dataSource={value} pagination={false} />
}

export default memo(FormFieldRuleTable)
