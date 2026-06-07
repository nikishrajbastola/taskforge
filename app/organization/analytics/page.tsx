"use client";

import ApplicationStatusChart from "@/components/ApplicationStatusChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function OrganizationAnalyticsPage() {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    acceptanceRate: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: tasks } = await supabase
      .from("tasks")
      .select("id")
      .eq("organization_id", user.id);

    const taskIds = tasks?.map((task) => task.id) || [];

    if (taskIds.length === 0) {
      return;
    }

    const { data: applications } = await supabase
      .from("applications")
      .select("*")
      .in("task_id", taskIds);

    const totalApplications = applications?.length || 0;

    const pendingApplications =
      applications?.filter((app) => app.status === "pending").length || 0;

    const acceptedApplications =
      applications?.filter((app) => app.status === "accepted").length || 0;

    const rejectedApplications =
      applications?.filter((app) => app.status === "rejected").length || 0;

    const acceptanceRate =
      totalApplications > 0
        ? Math.round((acceptedApplications / totalApplications) * 100)
        : 0;

    setMetrics({
      totalProjects: taskIds.length,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      acceptanceRate,
    });
  };

  const maxFunnelValue = Math.max(
    metrics.pendingApplications,
    metrics.acceptedApplications,
    metrics.rejectedApplications,
    1
  );

  return (
    <main style={page}>
      <section style={content}>
        <Link href="/organization" style={backLink}>
          ← Back to Dashboard
        </Link>

        <p style={eyebrow}>ANALYTICS</p>

        <h1 style={title}>Organization Insights</h1>

        <p style={subtitle}>
          Monitor project performance, application activity, and workflow KPIs.
        </p>

        <section style={grid}>
          <div style={card}>
            <p style={label}>Total Projects</p>
            <h2 style={value}>{metrics.totalProjects}</h2>
          </div>

          <div style={card}>
            <p style={label}>Applications</p>
            <h2 style={value}>{metrics.totalApplications}</h2>
          </div>

          <div style={card}>
            <p style={label}>Pending</p>
            <h2 style={value}>{metrics.pendingApplications}</h2>
          </div>

          <div style={card}>
            <p style={label}>Accepted</p>
            <h2 style={value}>{metrics.acceptedApplications}</h2>
          </div>

          <div style={card}>
            <p style={label}>Acceptance Rate</p>
            <h2 style={value}>{metrics.acceptanceRate}%</h2>
          </div>
        </section>

        <section style={panel}>
          <div>
            <p style={panelLabel}>APPLICATION FUNNEL</p>
            <h2 style={panelTitle}>Applications by Status</h2>
            <p style={panelText}>
              Understand where applicants currently sit in your review workflow.
            </p>
          </div>

          <div style={funnelList}>
            <FunnelRow
              label="Pending"
              value={metrics.pendingApplications}
              max={maxFunnelValue}
            />

            <FunnelRow
              label="Accepted"
              value={metrics.acceptedApplications}
              max={maxFunnelValue}
            />

            <FunnelRow
              label="Rejected"
              value={metrics.rejectedApplications}
              max={maxFunnelValue}
            />
          </div>
        </section>

        <section style={panel}>
          <div>
            <p style={panelLabel}>STATUS CHART</p>

            <h2 style={panelTitle}>Application Status Breakdown</h2>

            <p style={panelText}>
              Visualize how applications move through the review pipeline.
            </p>
          </div>

          <ApplicationStatusChart
            pending={metrics.pendingApplications}
            accepted={metrics.acceptedApplications}
            rejected={metrics.rejectedApplications}
          />
        </section>
      </section>
    </main>
  );
}

function FunnelRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = `${Math.max((value / max) * 100, value > 0 ? 10 : 0)}%`;

  return (
    <div style={funnelRow}>
      <div style={funnelTop}>
        <span style={funnelLabel}>{label}</span>
        <span style={funnelValue}>{value}</span>
      </div>

      <div style={barTrack}>
        <div style={{ ...barFill, width }} />
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
};

const content = {
  padding: "60px",
};

const backLink = {
  color: "#aaa",
  textDecoration: "none",
};

const eyebrow = {
  marginTop: "24px",
  color: "#c084fc",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.16em",
};

const title = {
  fontSize: "54px",
  marginTop: "10px",
};

const subtitle = {
  color: "#aaa",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  padding: "28px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const label = {
  color: "#aaa",
  fontSize: "14px",
};

const value = {
  fontSize: "42px",
  marginTop: "10px",
};

const panel = {
  marginTop: "28px",
  padding: "30px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const panelLabel = {
  color: "#c084fc",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.16em",
};

const panelTitle = {
  fontSize: "28px",
  marginTop: "8px",
  marginBottom: "8px",
};

const panelText = {
  color: "#aaa",
  marginBottom: "28px",
};

const funnelList = {
  display: "grid",
  gap: "18px",
};

const funnelRow = {
  display: "grid",
  gap: "8px",
};

const funnelTop = {
  display: "flex",
  justifyContent: "space-between",
};

const funnelLabel = {
  color: "#d4d4d8",
  fontWeight: 700,
};

const funnelValue = {
  color: "white",
  fontWeight: 800,
};

const barTrack = {
  width: "100%",
  height: "12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
  background: "white",
};