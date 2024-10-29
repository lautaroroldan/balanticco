"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import CardComponents from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { formatDate } from "@/utils/format"
import { getBalanceForEveryMonth, getFirstTransferDateByYear, getLastTransferDateByYear } from "@/utils/transfer"
import { Transfer } from "@/app/db/schema/transfer"


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
                <ChartContainer config={chartConfig}>
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
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                            />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="income" fill="#379137" radius={2} />
                        <Bar dataKey="expense" fill="#DB3535" radius={2} />
                    </BarChart>
                </ChartContainer>
            </CardComponents.CardContent>
        </CardComponents.Card>
    )
}

export default StatisticsChart
