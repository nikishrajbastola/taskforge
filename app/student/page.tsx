"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  description: string;
  skills: string | null;
  duration: string | null;
};

export default function StudentDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, description, skills, duration")
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
        return;
      }

      setTasks(data || []);
    };

    fetchTasks();
  }, []);

  const handleApply = async (taskId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to apply.");
      return;
    }

    const { error } = await supabase.from("applications").insert([
      {
        task_id: taskId,
        student_id: user.id,
        message: "I am interested in this project.",
        status: "pending",
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Application submitted!");
  };

  return (
    <main style={page}>
      <h1 style={title}>Available Projects</h1>
      <p style={subtitle}>
        Browse real tasks from organizations and apply to build experience.
      </p>

      <section style={grid}>
        {tasks.map((task) => (
          <div key={task.id} style={card}>
            <h2 style={cardTitle}>{task.title}</h2>
            <p style={description}>{task.description}</p>

            <div style={meta}>
              <span style={chip}>{task.skills || "Skills not listed"}</span>
              <span style={chip}>{task.duration || "Duration not listed"}</span>
            </div>

            <button style={button} onClick={() => handleApply(task.id)}>
              Apply
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "white",
  padding: "48px",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const title = {
  fontSize: "52px",
  marginBottom: "10px",
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

const cardTitle = {
  fontSize: "24px",
  marginBottom: "12px",
};

const description = {
  color: "#b5b5b5",
  lineHeight: "1.6",
};

const meta = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
  marginTop: "18px",
  marginBottom: "20px",
};

const chip = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  color: "#d4d4d8",
  fontSize: "13px",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "999px",
  border: "none",
  background: "white",
  color: "black",
  fontWeight: 700,
  cursor: "pointer",
};