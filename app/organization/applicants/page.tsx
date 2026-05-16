"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  status: string | null;
  message: string | null;
  student_id: string;
  tasks:
    | {
        title: string;
      }
    | {
        title: string;
      }[]
    | null;
};

export default function OrganizationApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        message,
        student_id,
        tasks (
          title
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setApplications(data || []);
  };

  return (
    <main style={page}>
      <aside style={sidebar}>
        <Link href="/" style={brand}>TaskForge</Link>

        <nav style={nav}>
          <Link href="/organization" style={navItem}>Overview</Link>
          <Link href="/organization/tasks" style={navItem}>My Tasks</Link>
          <Link href="/organization/applicants" style={activeNav}>Applicants</Link>
          <Link href="/organization/post-task" style={navItem}>Post Task</Link>
        </nav>
      </aside>

      <section style={content}>
        <p style={eyebrow}>APPLICATION MANAGEMENT</p>

        <h1 style={title}>Applicants</h1>

        <p style={subtitle}>
          Review students who applied to your projects.
        </p>

        <div style={list}>
          {applications.map((application) => {
            const task = Array.isArray(application.tasks)
              ? application.tasks[0]
              : application.tasks;

            return (
              <div key={application.id} style={card}>
                <div>
                  <h2 style={cardTitle}>
                    {task?.title || "Untitled project"}
                  </h2>

                  <p style={description}>
                    {application.message || "No application message provided."}
                  </p>

                  <p style={studentId}>
                    Student ID: {application.student_id}
                  </p>
                </div>

                <span style={statusBadge}>
                  {application.status || "pending"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const sidebar = {
  borderRight: "1px solid rgba(255,255,255,0.08)",
  padding: "28px",
  background: "#080808",
};

const brand = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "40px",
  display: "block",
};

const nav = {
  display: "grid",
  gap: "10px",
};

const navItem = {
  color: "#aaa",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "12px",
};

const activeNav = {
  color: "white",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
};

const content = {
  padding: "56px",
};

const eyebrow = {
  color: "#c084fc",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.16em",
};

const title = {
  fontSize: "52px",
  margin: "8px 0",
  letterSpacing: "-0.05em",
};

const subtitle = {
  color: "#aaa",
  fontSize: "18px",
  marginBottom: "32px",
};

const list = {
  display: "grid",
  gap: "16px",
};

const card = {
  padding: "24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
};

const cardTitle = {
  fontSize: "24px",
  marginBottom: "12px",
};

const description = {
  color: "#b5b5b5",
  lineHeight: "1.6",
};

const studentId = {
  marginTop: "14px",
  color: "#888",
  fontSize: "14px",
};

const statusBadge = {
  height: "fit-content",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(192,132,252,0.14)",
  color: "#c084fc",
  fontWeight: 700,
  fontSize: "13px",
};