import Link from "next/link";

export default function OrganizationDashboard() {
  return (
    <main style={page}>
      <nav style={nav}>
        <Link href="/" style={logo}>TaskForge</Link>
      </nav>

      <section style={hero}>
        <p style={tag}>ORGANIZATION DASHBOARD</p>

        <h1 style={title}>Manage your projects.</h1>

        <p style={subtitle}>
          Post tasks, review applicants, and work with student teams.
        </p>

        <Link href="/organization/post-task" style={button}>
          Post a Task
        </Link>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#000",
  color: "white",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const nav = {
  padding: "28px 48px",
};

const logo = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: 700,
};

const hero = {
  minHeight: "calc(100vh - 90px)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center" as const,
};

const tag = {
  color: "#c084fc",
  letterSpacing: "0.18em",
  fontSize: "13px",
  fontWeight: 700,
};

const title = {
  fontSize: "72px",
  margin: "20px 0",
};

const subtitle = {
  color: "#aaa",
  fontSize: "22px",
  marginBottom: "32px",
};

const button = {
  background: "white",
  color: "black",
  padding: "16px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
};