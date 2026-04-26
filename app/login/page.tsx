import Link from "next/link";

export default function LoginPage() {
  return (
    <main style={page}>
      <section style={card}>
        <Link href="/" style={brand}>TaskForge</Link>

        <h1 style={title}>Welcome back</h1>
        <p style={subtitle}>Log in to continue your work.</p>

        <form style={form}>
          <input style={input} placeholder="Email address" type="email" />
          <input style={input} placeholder="Password" type="password" />

          <button style={button} type="button">
            Log in
          </button>
        </form>

        <p style={bottomText}>
          New to TaskForge?{" "}
          <Link href="/signup" style={link}>Create account</Link>
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
  padding: "24px",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "440px",
  padding: "42px",
  borderRadius: "32px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
};

const brand = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: 700,
};

const title = {
  fontSize: "44px",
  lineHeight: "1",
  letterSpacing: "-0.05em",
  margin: "34px 0 14px",
};

const subtitle = {
  color: "#a1a1aa",
  fontSize: "17px",
  lineHeight: "1.5",
  marginBottom: "30px",
};

const form = {
  display: "grid",
  gap: "14px",
};

const input = {
  width: "100%",
  padding: "16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const button = {
  marginTop: "8px",
  padding: "16px",
  borderRadius: "999px",
  border: "none",
  background: "white",
  color: "black",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
};

const bottomText = {
  marginTop: "24px",
  color: "#a1a1aa",
  textAlign: "center" as const,
};

const link = {
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
};