import { Check, Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Motion, spring } from "react-motion";
import "./App.css";

const avatarGradients = [
  "linear-gradient(135deg, #ff8ec7, #8b48ff)",
  "linear-gradient(135deg, #ffd166, #ff4d4d)",
  "linear-gradient(135deg, #74ffd5, #37b2ff)",
  "linear-gradient(135deg, #ffe66d, #ff9f43)",
  "linear-gradient(135deg, #b5b3ff, #613fff)",
];

function GhostIcon() {
  return <img src="/prism_no_bg.png" alt="" width={100} />;
}

interface PresaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PresaleModal({ isOpen, onClose }: PresaleModalProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = "6r6gDud49nJyUYPEvfQJvkVFGvQx377UqCFSmHeDwkUp";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <Motion
        defaultStyle={{ scale: 0.8, opacity: 0, y: 20 }}
        style={{
          scale: spring(isOpen ? 1 : 0.8, { stiffness: 300, damping: 25 }),
          opacity: spring(isOpen ? 1 : 0, { stiffness: 200, damping: 20 }),
          y: spring(isOpen ? 0 : 20, { stiffness: 300, damping: 25 }),
        }}
      >
        {(interpolatedStyle: any) => (
          <div
            className="modal-content"
            style={{
              transform: `scale(${interpolatedStyle.scale}) translateY(${interpolatedStyle.y}px)`,
              opacity: interpolatedStyle.opacity,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="modal-title">How to Buy $PRISM</h2>

            <div className="modal-steps">
              <div className="modal-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Copy Solana Address</h3>
                  <div className="wallet-address-container">
                    <code className="wallet-address">{walletAddress}</code>
                    <button
                      type="button"
                      className="copy-button"
                      onClick={copyToClipboard}
                      aria-label="Copy wallet address"
                    >
                      {copied ? (
                        <Check
                          size={20}
                          className="copy-icon copy-icon--success"
                        />
                      ) : (
                        <Copy size={20} className="copy-icon" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">Send SOL to Presale Wallet</h3>
                  <p className="step-description">
                    Transfer SOL from your wallet to the address above
                  </p>
                </div>
              </div>

              <div className="modal-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">Get $PRISM in Wallet</h3>
                  <p className="step-description">
                    Receive your $PRISM tokens directly to your wallet after the
                    presale ends
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-cta-button"
                onClick={onClose}
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </Motion>
    </div>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);
  const [presaleModalOpen, setPresaleModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="app">
      <div
        className="background-glow background-glow--left"
        aria-hidden="true"
      />
      <div
        className="background-glow background-glow--right"
        aria-hidden="true"
      />

      <Motion
        defaultStyle={{ opacity: 0, y: 32, scale: 0.94 }}
        style={{
          opacity: spring(mounted ? 1 : 0, { stiffness: 60, damping: 12 }),
          y: spring(mounted ? 0 : 32, { stiffness: 80, damping: 14 }),
          scale: spring(mounted ? 1 : 0.94, { stiffness: 120, damping: 10 }),
        }}
      >
        {(interpolatedStyle: any) => (
          <main
            className="hero"
            style={{
              opacity: interpolatedStyle.opacity,
              transform: `translateY(${interpolatedStyle.y}px) scale(${interpolatedStyle.scale})`,
            }}
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              className="hero-icon-wrapper"
            >
              <GhostIcon />
            </div>

            <Motion
              defaultStyle={{ opacity: 0, badgeY: -8 }}
              style={{
                opacity: spring(mounted ? 1 : 0, {
                  stiffness: 90,
                  damping: 10,
                }),
                badgeY: spring(mounted ? 0 : -8, {
                  stiffness: 90,
                  damping: 11,
                }),
              }}
            >
              {(interpolatedStyle: any) => (
                <span
                  className="hero-pill"
                  style={{
                    opacity: interpolatedStyle.opacity,
                    transform: `translateY(${interpolatedStyle.badgeY}px)`,
                  }}
                >
                  <span className="pill-dot" aria-hidden="true" />
                  Amazing resources coming your way
                </span>
              )}
            </Motion>

            <h1 className="hero-title">
             Why Wait, When you can be Rich Now
            </h1>

            <p className="hero-subtitle">
              Get in early. Our new tool spots low-cap runners before they take
              off. No noise, just clean signals. Join the Telegram for early
              access, feature priority, and the first look at what&apos;s coming
              next.
            </p>

            <div className="hero-cta">
              <button
                type="button"
                className="cta-button cta-button--primary"
                onClick={() => setPresaleModalOpen(true)}
              >
                <span>Join Presale</span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>
              <a
                className="cta-button cta-button--secondary"
                href="https://t.me/prismxsol"
              >
                <span>Join Prism Telegram Community</span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <a href="https://x.com/prismxsol">
              <div className="social-proof">
                <ul className="social-avatars" aria-hidden="true">
                  {avatarGradients.map((gradient, index) => (
                    <li
                      key={gradient}
                      className="social-avatar"
                      style={{
                        backgroundImage: gradient,
                        zIndex: avatarGradients.length - index,
                      }}
                    />
                  ))}
                </ul>
                <p className="social-copy">
                  Join <strong>116.3k followers</strong> ·{" "}
                  <span aria-hidden="true">✦</span> X
                </p>
              </div>
            </a>
          </main>
        )}
      </Motion>

      <PresaleModal
        isOpen={presaleModalOpen}
        onClose={() => setPresaleModalOpen(false)}
      />
    </div>
  );
}

export default App;
