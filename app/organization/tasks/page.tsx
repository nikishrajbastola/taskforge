"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  description: string;
  skills: string | null;
  duration: string | null;
};

export default function OrganizationTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, description, skills, duration")
        .eq("organization_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
        return;
      }

      setTasks(data || []);
    };

    fetchTasks();
  }, []);

  return (
    <main style={page}>
      <aside style={sidebar}>
        <Link href="/" style={brand}>TaskForge</Link>

        <nav style={nav}>
          <Link href="/organization" style={navItem}>Overview</Link>
          <Link href="/organization/tasks" style={activeNav}>My Tasks</Link>
          <Link href="/organization/applicants" style={navItem}>Applicants</Link>
          <Link href="/organization/post-task" style={navItem}>Post Task</Link>
        </nav>
      </aside>

      <section style={content}>
        <p style={eyebrow}>POSTED PROJECTS</p>
        <h1 style={title}>My Tasks</h1>
        <p style={subtitle}>Manage projects your organization has posted.</p>

        <div style={grid}>
          {tasks.map((task) => (
            <div key={task.id} style={card}>
              <h2 style={cardTitle}>{task.title}</h2>
              <p style={description}>{task.description}</p>

              <div style={meta}>
                <span style={chip}>{task.skills || "Skills not listed"}</span>
                <span style={chip}>{task.duration || "Duration not listed"}</span>
              </div>
            </div>
          ))}
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

const nav = { display: "grid", gap: "10px" };

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

const content = { padding: "56px" };

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

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "20px",
};

const card = {
  padding: "24px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const cardTitle = { fontSize: "24px", marginBottom: "12px" };

const description = {
  color: "#b5b5b5",
  lineHeight: "1.6",
};

const meta = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginTop: "18px",
};

const chip = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  color: "#d4d4d8",
  fontSize: "13px",
};