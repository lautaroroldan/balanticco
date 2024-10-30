"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import CardComponents from "@/components/ui/card"
import Chart from "@/components/ui/chart"
import { formatDate } from "@/utils/format"
import { getBalanceForEveryMonth, getFirstTransferDateByYear, getLastTransferDateByYear } from "@/utils/transfer"
import { Transfer } from "@/app/db/schema/transfer"
import { ChartConfig } from "@/components/ui/chart"


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

export function StatisticsChart({ className, transfers }: { className?: string, transfers: Transfer[] }) {

    const firstTransferDate = getFirstTransferDateByYear(transfers, new Date().getFullYear())
    const lastTransferDate = getLastTransferDateByYear(transfers, new Date().getFullYear())

    const data = getBalanceForEveryMonth(transfers, new Date().getFullYear())
    return (
        <CardComponents.Card className={className}>
            <CardComponents.CardHeader>
                <CardComponents.CardTitle className='capitalize'>{formatDate(firstTransferDate, { month: 'short', year: 'numeric' })} - {formatDate(lastTransferDate, { month: 'short', year: 'numeric' })}</CardComponents.CardTitle>
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
