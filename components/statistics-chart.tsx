"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import CardComponents from "@/components/ui/card"
import Chart from "@/components/ui/chart"
import { ChartConfig } from "@/components/ui/chart"
import { fetchStatisticsChartData } from "@/utils/actions"
import { useEffect, useState } from "react"


const chartConfig = {
    income: {
        label: "Ingresos",
        color: "#379137",
    },
    expense: {
        label: "Gastos",
        color: "#DB3535",
    },
} satisfies ChartConfig

export function StatisticsChart({ className, userId }: { className?: string, userId: string }) {
    const [data, setData] = useState<{ month: string, income: number, expense: number }[]>([])

    useEffect(() => {
        async function fetchData() {
            const fetchData = await fetchStatisticsChartData(userId, new Date().getFullYear())
            setData(fetchData)
        }
        fetchData()
    }, [userId])


    const getChartTitle = () => {
        if (data.length === 0) {
            return "No hay datos para mostrar"
        }
        return `${data[0].month} - ${data[data.length - 1].month}`
    }

    return (
        <CardComponents.Card className={className}>
            <CardComponents.CardHeader>
                <CardComponents.CardTitle className="capitalize">{getChartTitle()}</CardComponents.CardTitle>
            </CardComponents.CardHeader>
            <CardComponents.CardContent className="px-0 pr-8">
                <Chart.ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid
                            vertical={false} />
                        <XAxis
                            className="capitalize"
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                        />
                        <Chart.ChartTooltip
                            cursor={false}
                            content={<Chart.ChartTooltipContent />}
                        />
                        <Chart.ChartLegend content={<Chart.ChartLegendContent />} />
                        <Bar dataKey="income" fill="#379137" radius={2} />
                        <Bar dataKey="expense" fill="#DB3535" radius={2} />
                    </BarChart>
                </Chart.ChartContainer>
            </CardComponents.CardContent>
        </CardComponents.Card>
    )
}

export default StatisticsChart
