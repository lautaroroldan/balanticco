"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import useTransferStore from "@/store/transfer-store"
import { formatDate } from "@/utils/format"


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

export function StatisticsChart({ className }: { className?: string }) {
    const getBalanceForEveryMonth = useTransferStore(state => state.getBalanceForEveryMonth)
    const firstTransferDate = useTransferStore(state => state.getFirstTransferDateByYear(new Date().getFullYear()))
    const lastTransferDate = useTransferStore(state => state.getLastTransferDateByYear(new Date().getFullYear()))

    const data = getBalanceForEveryMonth(new Date().getFullYear())

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className='capitalize'>{formatDate(firstTransferDate, { month: 'short', year: 'numeric' })} - {formatDate(lastTransferDate, { month: 'short', year: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pr-8">
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
            </CardContent>
        </Card>
    )
}

export default StatisticsChart
