"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentProfilePage() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("resumes").getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ resume_url: publicUrl })
      .eq("id", user.id);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    setResumeUrl(publicUrl);
    alert("Resume uploaded successfully!");
  };

  return (
    <main style={page}>
      <aside style={sidebar}>
        <h2 style={brand}>TaskForge</h2>

        <nav style={nav}>
          <Link href="/student" style={navItem}>Overview</Link>
          <Link href="/student/projects" style={navItem}>Browse Projects</Link>
          <Link href="/student/applications" style={navItem}>My Applications</Link>
          <Link href="/student/profile" style={activeNav}>Profile</Link>
        </nav>
      </aside>

      <section style={content}>
        <p style={eyebrow}>STUDENT PROFILE</p>
        <h1 style={title}>Your proof-of-work profile.</h1>
        <p style={subtitle}>
          Upload your resume and manage your student profile.
        </p>

        <div style={card}>
          <h2 style={cardTitle}>Resume</h2>

          <p style={description}>
            Upload a resume so organizations can review your background.
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            style={fileInput}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button style={button} onClick={handleUpload}>
            Upload Resume
          </button>

          {resumeUrl && (
            <a href={resumeUrl} target="_blank" style={resumeLink}>
              View uploaded resume
            </a>
          )}
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
  fontSize: "22px",
  marginBottom: "40px",
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
  padding: "48px",
};

const eyebrow = {
  color: "#60a5fa",
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

const card = {
  maxWidth: "620px",
  padding: "28px",
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
  marginBottom: "20px",
};

const fileInput = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#111",
  color: "white",
  marginBottom: "16px",
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

const resumeLink = {
  display: "block",
  color: "#60a5fa",
  marginTop: "18px",
  textDecoration: "none",
};