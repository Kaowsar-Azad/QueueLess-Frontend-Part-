export interface WaitMetrics {
  peopleAhead: number;
  formattedWaitTime: string;
  trafficStatus: "Low Traffic" | "High Traffic" | "Very High Traffic" | "Active";
  statusColor: string;
  imageColor: string;
}

export function calculateWaitMetrics(
  totalTokens: number,
  currentQueue: number,
  avgTimePerToken: number = 20,
  userTokenNumber?: number
): WaitMetrics {
  // If userTokenNumber is provided, calculate for that specific user.
  // Otherwise, calculate for a new user who is about to book (their token would be totalTokens + 1).
  const targetToken = userTokenNumber ?? (totalTokens + 1);
  let peopleAhead = targetToken - currentQueue - 1;

  if (peopleAhead < 0) {
    peopleAhead = 0;
  }

  // Calculate wait time in minutes
  const totalWaitMins = peopleAhead * avgTimePerToken;

  // Format wait time
  let formattedWaitTime = "";
  if (totalWaitMins === 0) {
    formattedWaitTime = "Almost your turn!";
  } else if (totalWaitMins < 60) {
    formattedWaitTime = `${totalWaitMins} mins`;
  } else {
    const hours = Math.floor(totalWaitMins / 60);
    const mins = totalWaitMins % 60;
    formattedWaitTime = mins > 0 ? `${hours} hr ${mins} mins` : `${hours} hours`;
  }

  // Determine traffic status and colors
  let trafficStatus: WaitMetrics["trafficStatus"] = "Active";
  let statusColor = "text-emerald-600 bg-emerald-100";
  let imageColor = "bg-emerald-50";

  if (peopleAhead > 15) {
    trafficStatus = "Very High Traffic";
    statusColor = "text-red-600 bg-red-100";
    imageColor = "bg-zinc-100";
  } else if (peopleAhead > 5) {
    trafficStatus = "High Traffic";
    statusColor = "text-amber-600 bg-amber-100";
    imageColor = "bg-blue-50";
  } else {
    // 0-5 people ahead
    trafficStatus = "Active"; // Or Low Traffic
    statusColor = "text-emerald-600 bg-emerald-100";
    imageColor = "bg-emerald-50";
  }

  return {
    peopleAhead,
    formattedWaitTime,
    trafficStatus,
    statusColor,
    imageColor
  };
}
