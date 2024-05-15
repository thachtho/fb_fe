import React from 'react'
import { getAdvanceMoney, getFees } from '../utils'

interface IProps {
  content: string
}
function ScandalAndMoney({ content }: IProps) {
  const fees = getFees(content)?.replace('k', '') || ''
  const advanceMoney = getAdvanceMoney(content)?.replace('k', '') || ''

  return (
    <div className="item-m3">
      <span className="mr-4">
        Phốt:<span className="text-red-600"> 0</span>
      </span>
      <span className="mr-4">
        Phí: <i className="text-red-600">{fees}</i>
      </span>
      <span>
        Ứng: <i className="text-red-600">{advanceMoney}</i>
      </span>
    </div>
  )
}

export default ScandalAndMoney
