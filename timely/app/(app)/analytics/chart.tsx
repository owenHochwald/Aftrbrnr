'use client'

import { Switch } from '@/components/ui/switch'
import { BarChart, DonutChart, Legend, Title } from '@tremor/react'
import React, { useState } from 'react';


type ChartProps = {
    data: any[]
}

const hourFormatter = (number: number) => `${number.toFixed(2)} hours`


export const SwitchActivityChart = ({ data }: ChartProps) => {
    const [displayChart, setDisplayChart] = useState('ActivityChart');
    const handleSwitchChange = () => {
        setDisplayChart((prevDisplayChart) => (prevDisplayChart === 'ActivityDonutChart' ? 'ActivityBarChart' : 'ActivityDonutChart'));
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Title>Activity Breakdown</Title>
                <Switch onCheckedChange={handleSwitchChange} />
            </div>
            <h1>{displayChart === 'ActivityDonutChart' ? <ActivityDonutChart data={data} /> : <ActivityBarChart data={data} />}</h1>
        </div>
    )
}


export const SwitchClientChart = ({ data }: ChartProps) => {
    const [displayChart, setDisplayChart] = useState('ClientChart');
    const handleSwitchChange = () => {
        setDisplayChart((prevDisplayChart) => (prevDisplayChart === 'ClientBarChart' ? 'ClientDonutChart' : 'ClientBarChart'));
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Title>Clients Breakdown</Title>
                <Switch onCheckedChange={handleSwitchChange} />
            </div>
            <h1>{displayChart === 'ClientBarChart' ? <ClientBarChart data={data} /> : <ClientDonutChart data={data} />}</h1>
        </div>
    )
}

// clients charts

export const ClientDonutChart = ({ data }: ChartProps) => {
    console.log(data)
    return (
        <div className="flex items-center justify-center space-x-6">
            <DonutChart
                className="mt-6"
                data={data}
                category="duration"
                index="name"
                valueFormatter={hourFormatter}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'indigo', 'rose', 'amber', 'slate']}
            />

            <Legend
                categories={data.map((d) => d.name)}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'indigo', 'rose', 'amber', 'slate']}
                className="max-w-xs"
            />
        </div>

    )
}


export const ClientBarChart = ({ data }: ChartProps) => {
    return (
        <BarChart
            data={data}
            index="name"
            categories={["duration"]}
            colors={['rose', 'cyan', 'amber']}
            valueFormatter={hourFormatter}
            yAxisWidth={48}
        />
    )
}


// activities charts

export const ActivityDonutChart = ({ data }: ChartProps) => {
    return (
        <div className="flex items-center justify-center space-x-4">
            <DonutChart
                className="mt-6"
                data={data}
                category="duration"
                index="name"
                valueFormatter={hourFormatter}
                colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
            />

            <Legend
                categories={data.map((d) => d.name)}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'indigo', 'rose', 'amber', 'slate']}
                className="max-w-xs"
            />
        </div>

    )
}

export const ActivityBarChart = ({ data }: ChartProps) => {
    return (
        <BarChart
            data={data}
            index="name"
            categories={["duration"]}
            colors={['indigo', 'rose', 'cyan', 'amber']}
            valueFormatter={hourFormatter}
            yAxisWidth={48}
            // onValueChange={(v) => console.log(v)}
            showXAxis={false}
        />
    )
}