'use client'

import { BarChart, DonutChart } from '@tremor/react'

type ChartProps = {
    data: any[]
}

const hourFormatter = (number: number) => `${number.toFixed(2)} hours`

export const ClientChart = ({ data }: ChartProps) => {
    return (
        <DonutChart
            className="mt-6"
            data={data}
            category="duration"
            index="name"
            valueFormatter={hourFormatter}
            colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
        />
    )
}

export const ActivityDonutChart = ({ data }: ChartProps) => {
    return (
        <DonutChart
            className="mt-6"
            data={data}
            category="duration"
            index="name"
            valueFormatter={hourFormatter}
            colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
        />
    )
}

export const ActivityBarChart = ({ data }: ChartProps) => {
    return (
        <BarChart
        data={data}
        index="name"
        categories= {["duration"]}
        colors={['indigo', 'rose', 'cyan', 'amber']}
        valueFormatter={hourFormatter}
        yAxisWidth={48}
        // onValueChange={(v) => console.log(v)}
        showXAxis={false}
      />
    )
}