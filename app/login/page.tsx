"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Login failed. Please try again.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      alert(profileError.message);
      return;
    }

    if (profile.role === "student") {
      router.push("/student");
    } else if (profile.role === "organization") {
      router.push("/organization");
    } else if (profile.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <main style={page}>
      <section style={card}>
        <Link href="/" style={brand}>
          TaskForge
        </Link>

        <h1 style={title}>Welcome back</h1>

        <p style={subtitle}>Log in to continue your work.</p>

        <div style={form}>
          <input
            style={input}
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={button} onClick={handleLogin}>
            Log in
          </button>
        </div>

        <p style={bottomText}>
          New to TaskForge?{" "}
          <Link href="/signup" style={link}>
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at 50% 20%, rgba(124,58,237,0.22), transparent 32%), #000",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  width: "100%",
  maxWidth: "440px",
  padding: "42px",
  borderRadius: "32px",
  background: "rgba(255,255,255,0.06)",
};

const brand = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: 700,
};

const title = {
  fontSize: "44px",
  margin: "20px 0",
};

const subtitle = {
  color: "#aaa",
  marginBottom: "20px",
};

const form = {
  display: "grid",
  gap: "14px",
};

const input = {
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  background: "#1a1a1a",
  color: "white",
};

const button = {
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  background: "white",
  color: "black",
  fontWeight: 700,
  cursor: "pointer",
};

const bottomText = {
  marginTop: "20px",
};

const link = {
  color: "white",
};