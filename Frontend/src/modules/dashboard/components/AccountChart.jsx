import React, { useState } from "react"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useAccount } from "@account/context/AccountContext"
import { Skeleton } from "@/components/ui/skeleton"
import useAuthEffect from "@/hooks/useAuthEffect"

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--chart-1)",
  },
}

export function AccountChart() {

  const { accountChart, selectedAccount } = useAccount();
  const [accountHistory, setAccountHistory] = useState(null);  

  useAuthEffect(() => {
    
    if (!selectedAccount?.id) return;

    const fetchData = async () => {
      try {
        const response  = await accountChart({ account_id: selectedAccount?.id });
        setAccountHistory(response?.data);

      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative group px-4 lg:px-0">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md pointer-events-none" />
      {accountHistory ? (
        <Card className="relative z-10 border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-sm shadow-sm py-2 w-full max-w-full">
          <CardHeader className="pb-1">
            <CardTitle className="text-gray-900 dark:text-white">Account Balance</CardTitle>
            <CardDescription>Last 30 Days</CardDescription>
          </CardHeader>
          <CardContent className="py-1">
            <ChartContainer config={chartConfig} style={{ height: 250, width: "100%" }}>
              <LineChart data={accountHistory} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="balance"
                  type="natural"
                  stroke="var(--color-balance)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none text-gray-900 dark:text-white">
              Trending up by 5.2% in the last 30 days <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">Balance trend over the past 30 days</div>
          </CardFooter>
        </Card>
      ) : (
        <div className="relative z-10 border-0 overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-sm shadow-sm py-2 w-full max-w-full rounded-2xl p-4">
          <div className="mb-2">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="mt-1 h-4 w-32 rounded-md" />
          </div>
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </div>
        </div>
      )}
    </div>
  )

}
