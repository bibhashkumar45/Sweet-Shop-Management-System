// Footer component displayed at the bottom of the application.
// Shows project copyright, developer information, and profile links.

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © 2025 <strong>Sweet Shop Management System</strong>
        </p>

        <p className="footer-author">
          Built by <strong>Bibhash Kumar</strong>
        </p>

        <div className="footer-links">
          <span className="role">MERN Stack Developer</span>
          <a
            href="https://github.com/bibhashkumar45"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bibhash4587/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
