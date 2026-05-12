"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("");

  const handlePostTask = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description,
        skills,
        duration,
        organization_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task posted successfully!");
    setTitle("");
    setDescription("");
    setSkills("");
    setDuration("");
  };

  return (
    <main style={page}>
      <aside style={sidebar}>
        <Link href="/" style={brand}>TaskForge</Link>

        <nav style={navLinks}>
          <Link href="/organization" style={navItem}>Dashboard</Link>
          <Link href="/organization/post-task" style={activeItem}>Post Task</Link>
        </nav>
      </aside>

      <section style={content}>
        <div style={header}>
          <p style={eyebrow}>Organization</p>
          <h1 style={titleStyle}>Post a new task</h1>
          <p style={subtext}>
            Create a clear project students can complete in a focused sprint.
          </p>
        </div>

        <div style={card}>
          <label style={label}>Task title</label>
          <input
            style={input}
            placeholder="Example: Clean research survey data"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label style={label}>Description</label>
          <textarea
            style={textarea}
            placeholder="Describe the work, expected outcome, timeline, and requirements."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label style={label}>Skills needed</label>
          <input
            style={input}
            placeholder="Example: Excel, Python, Research"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label style={label}>Duration</label>
          <input
            style={input}
            placeholder="Example: 2 weeks"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button style={button} onClick={handlePostTask}>
            Publish task
          </button>
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
  marginBottom: "32px",
};

const eyebrow = {
  color: "#a78bfa",
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.12em",
};

const titleStyle = {
  fontSize: "48px",
  margin: "8px 0",
};

const subtext = {
  color: "#aaa",
  fontSize: "18px",
};

const card = {
  maxWidth: "720px",
  padding: "32px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#ddd",
  fontWeight: 600,
};

const input = {
  width: "100%",
  padding: "16px",
  marginBottom: "20px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#111",
  color: "white",
  fontSize: "16px",
};

const textarea = {
  width: "100%",
  height: "180px",
  padding: "16px",
  marginBottom: "24px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#111",
  color: "white",
  fontSize: "16px",
};

const button = {
  padding: "14px 22px",
  borderRadius: "999px",
  border: "none",
  background: "white",
  color: "black",
  fontWeight: 700,
  cursor: "pointer",
};