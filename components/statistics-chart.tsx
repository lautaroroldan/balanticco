"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A multiple bar chart"

const chartData = [
    { month: "January", income: 186, expense: 80 },
    { month: "February", income: 305, expense: 200 },
    { month: "March", income: 237, expense: 120 },
    { month: "April", income: 73, expense: 190 },
    { month: "May", income: 209, expense: 130 },
    { month: "June", income: 214, expense: 140 },
]

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
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>January - June 2024</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                hideLabel
                            />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="income" fill="#379137" radius={4} />
                        <Bar dataKey="expense" fill="#DB3535" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default StatisticsChart
