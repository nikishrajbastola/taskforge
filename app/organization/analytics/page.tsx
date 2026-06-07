"use client";

import ApplicationStatusChart from "@/components/ApplicationStatusChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  skills: string | null;
};

type Application = {
  id: string;
  status: string | null;
};

export default function OrganizationAnalyticsPage() {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    acceptanceRate: 0,
    topSkills: [] as string[],
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
      .select("id, skills")
      .eq("organization_id", user.id);

    const organizationTasks = (tasks || []) as Task[];

    const taskIds = organizationTasks.map((task) => task.id);

    const skillCounts: Record<string, number> = {};

    organizationTasks.forEach((task) => {
      if (!task.skills) return;

      task.skills.split(",").forEach((skill: string) => {
        const cleanSkill = skill.trim();

        if (!cleanSkill) return;

        skillCounts[cleanSkill] =
          (skillCounts[cleanSkill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCounts)
      .sort(
        (a: [string, number], b: [string, number]) =>
          b[1] - a[1]
      )
      .slice(0, 5)
      .map(([skill]: [string, number]) => skill);

    if (taskIds.length === 0) {
      setMetrics({
        totalProjects: 0,
        totalApplications: 0,
        pendingApplications: 0,
        acceptedApplications: 0,
        rejectedApplications: 0,
        acceptanceRate: 0,
        topSkills,
      });

      return;
    }

    const { data: applications } = await supabase
      .from("applications")
      .select("id, status")
      .in("task_id", taskIds);

    const organizationApplications =
      (applications || []) as Application[];

    const totalApplications =
      organizationApplications.length;

    const pendingApplications =
      organizationApplications.filter(
        (app) =>
          app.status === "pending" ||
          app.status === null
      ).length;

    const acceptedApplications =
      organizationApplications.filter(
        (app) => app.status === "accepted"
      ).length;

    const rejectedApplications =
      organizationApplications.filter(
        (app) => app.status === "rejected"
      ).length;

    const acceptanceRate =
      totalApplications > 0
        ? Math.round(
            (acceptedApplications / totalApplications) *
              100
          )
        : 0;

    setMetrics({
      totalProjects: taskIds.length,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      acceptanceRate,
      topSkills,
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
          Monitor project performance, application
          activity, and workflow KPIs.
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
            <h2 style={value}>
              {metrics.pendingApplications}
            </h2>
          </div>

          <div style={card}>
            <p style={label}>Accepted</p>
            <h2 style={value}>
              {metrics.acceptedApplications}
            </h2>
          </div>

          <div style={card}>
            <p style={label}>Acceptance Rate</p>
            <h2 style={value}>{metrics.acceptanceRate}%</h2>
          </div>
        </section>

        <section style={panel}>
          <div>
            <p style={panelLabel}>
              APPLICATION FUNNEL
            </p>

            <h2 style={panelTitle}>
              Applications by Status
            </h2>

            <p style={panelText}>
              Understand where applicants currently sit in
              your review workflow.
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

            <h2 style={panelTitle}>
              Application Status Breakdown
            </h2>

            <p style={panelText}>
              Visualize how applications move through the
              review pipeline.
            </p>
          </div>

          <ApplicationStatusChart
            pending={metrics.pendingApplications}
            accepted={metrics.acceptedApplications}
            rejected={metrics.rejectedApplications}
          />
        </section>

        <section style={panel}>
          <div>
            <p style={panelLabel}>SKILL INSIGHTS</p>

            <h2 style={panelTitle}>
              Top Skills Requested
            </h2>

            <p style={panelText}>
              Identify the most common skills requested
              across your posted projects.
            </p>
          </div>

          <div style={skillList}>
            {metrics.topSkills.length === 0 ? (
              <p style={emptyText}>
                No skills listed yet.
              </p>
            ) : (
              metrics.topSkills.map((skill, index) => (
                <div key={skill} style={skillRow}>
                  <span style={skillRank}>
                    #{index + 1}
                  </span>

                  <span style={skillName}>{skill}</span>
                </div>
              ))
            )}
          </div>
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
  const width = `${Math.max(
    (value / max) * 100,
    value > 0 ? 10 : 0
  )}%`;

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
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
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

const skillList = {
  display: "grid",
  gap: "12px",
};

const skillRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.05)",
};

const skillRank = {
  color: "#c084fc",
  fontWeight: 800,
};

const skillName = {
  color: "white",
  fontWeight: 700,
};

const emptyText = {
  color: "#aaa",
};