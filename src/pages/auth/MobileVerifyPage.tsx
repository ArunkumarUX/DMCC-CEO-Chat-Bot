import { useCallback, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { AdgmLogo } from '../../components/brand/AdgmLogo';
import { verifyPin } from '../../auth/authApi';
import { WELCOME_PATH } from '../../config/auth';
import { saveVerifiedSession } from '../../auth/authStorage';
import { EXECUTIVE_USER } from '../../config/user';
import '../../styles/auth-gate.css';

const PIN_LENGTH = 4;

export function MobileVerifyPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [digits, setDigits] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const pin = digits.join('');

  const submitPin = useCallback(
    async (value: string) => {
      if (!sessionId || value.length !== PIN_LENGTH) return;
      setSubmitting(true);
      setError(null);
      const result = await verifyPin(sessionId, value);
      if (result.ok && result.clientToken) {
        saveVerifiedSession(result.clientToken);
        navigate(WELCOME_PATH, { replace: true });
        return;
      }
      if (result.ok) {
        navigate(WELCOME_PATH, { replace: true });
        return;
      }
      if (result.error === 'session_expired') {
        setError('This QR session expired. On your computer, refresh the page and scan again.');
        setSubmitting(false);
        return;
      }
      if (result.error === 'network') {
        setError(
          'Cannot reach the server. Use the same Wi‑Fi as your computer and run: npm run dev',
        );
        setSubmitting(false);
        return;
      }
      setError('Incorrect PIN. Please try again.');
      setDigits(Array(PIN_LENGTH).fill(''));
      inputsRef.current[0]?.focus();
      setSubmitting(false);
    },
    [sessionId, navigate],
  );

  const handleChange = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    setError(null);
    if (char && index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.every((d) => d) && next.join('').length === PIN_LENGTH) {
      void submitPin(next.join(''));
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitPin(pin);
  };

  if (!sessionId) {
    return (
      <div className="auth-gate auth-gate--mobile">
        <p className="auth-gate__error">Invalid verification link.</p>
      </div>
    );
  }

  return (
    <div className="auth-gate auth-gate--mobile">
      <AdgmLogo variant="onLight" showTagline={false} />
      <div className="auth-gate__lock-badge" aria-hidden>
        <Lock className="h-5 w-5" />
      </div>
      <h1 className="auth-gate__title auth-gate__title--sm">Enter your PIN</h1>
      <p className="auth-gate__instruction auth-gate__instruction--compact">
        Enter the 4-digit PIN to unlock Personal AI for {EXECUTIVE_USER.firstName}.
      </p>

      <form className="auth-gate__pin-form" onSubmit={handleSubmit}>
        <div className="auth-gate__pin-row" role="group" aria-label="4-digit PIN">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete="one-time-code"
              className="auth-gate__pin-cell"
              value={d}
              disabled={submitting}
              aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e.key)}
            />
          ))}
        </div>
        {error && (
          <p className="auth-gate__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="auth-gate__submit" disabled={pin.length !== PIN_LENGTH || submitting}>
          {submitting ? 'Verifying…' : 'Verify'}
        </button>
      </form>
    </div>
  );
}
