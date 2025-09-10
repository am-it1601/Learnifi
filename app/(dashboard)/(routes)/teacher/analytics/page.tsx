import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

async function AnalyticsPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalSales, totalRevenue } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
}

export default AnalyticsPage;
