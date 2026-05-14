"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  message: string | null;
  status: string | null;
  task_id: string;
  student_id: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  applications: Application[];
};

export default function OrganizationDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchOrgTasks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select(`
          id,
          title,
          description,
          applications (
            id,
            message,
            status,
            task_id,
            student_id
          )
        `)
        .eq("organization_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
        return;
      }

      setTasks(data || []);
    };

    fetchOrgTasks();
  }, []);

  return (
    <main style={page}>
      <aside style={sidebar}>
        <Link href="/" style={brand}>TaskForge</Link>

        <nav style={navLinks}>
          <Link href="/organization" style={activeItem}>Dashboard</Link>
          <Link href="/organization/post-task" style={navItem}>Post Task</Link>
        </nav>
      </aside>

      <section style={content}>
        <div style={header}>
          <div>
            <p style={eyebrow}>ORGANIZATION DASHBOARD</p>
            <h1 style={title}>Manage your projects</h1>
            <p style={subtitle}>Review posted tasks and student applications.</p>
          </div>

          <Link href="/organization/post-task" style={button}>
            Post a Task
          </Link>
        </div>

        <section style={grid}>
          {tasks.map((task) => (
            <div key={task.id} style={card}>
              <h2 style={cardTitle}>{task.title}</h2>
              <p style={description}>{task.description}</p>

              <div style={divider} />

              <h3 style={sectionTitle}>Applicants</h3>

              {task.applications.length === 0 ? (
                <p style={muted}>No applicants yet.</p>
              ) : (
                task.applications.map((app) => (
                  <div key={app.id} style={applicationCard}>
                    <p style={appText}>{app.message || "No message provided."}</p>
                    <p style={status}>Status: {app.status}</p>
                  </div>
                ))
              )}
            </div>
          ))}
        </section>
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
};

const navLinks = {
  display: "grid",
  gap: "10px",
  marginTop: "40px",
};

const navItem = {
  color: "#aaa",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "12px",
};

const activeItem = {
  color: "white",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
};

const content = {
  padding: "48px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const eyebrow = {
  color: "#c084fc",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.16em",
};

const title = {
  fontSize: "48px",
  margin: "8px 0",
};

const subtitle = {
  color: "#aaa",
  fontSize: "18px",
};

const button = {
  background: "white",
  color: "black",
  padding: "14px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  gap: "20px",
};

const card = {
  padding: "24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const cardTitle = {
  fontSize: "24px",
  marginBottom: "10px",
};

const description = {
  color: "#b5b5b5",
  lineHeight: "1.6",
};

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.1)",
  margin: "20px 0",
};

const sectionTitle = {
  fontSize: "16px",
  marginBottom: "12px",
};

const muted = {
  color: "#888",
};

const applicationCard = {
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  marginBottom: "10px",
};

const appText = {
  color: "#ddd",
};

const status = {
  color: "#a78bfa",
  fontSize: "14px",
  marginTop: "8px",
};