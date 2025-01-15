import { Progress } from 'antd'
import React from 'react'

export default function ProgressApp({
    percent
}:{
    percent: number
} ) {
    return (
        <Progress
          type="circle"
          percent={100}
          steps={{ count: 10, gap: 2 }}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
    )
}
