export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        background: "#f3f3f3",
        marginTop: "2rem",
      }}
    >
      <span>
        &copy; {new Date().getFullYear()} To-Do App. All rights reserved.
      </span>
    </footer>
  );
}
