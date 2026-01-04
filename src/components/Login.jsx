import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import loginBackground from '../assets/login_background.png';

const SHAPES_CONFIG = [
  { id: 'purple', type: 'pill', height: 380, width: 170, xOffset: -200, color: '#7c3aed', eyeOffsetY: 310 },
  { id: 'slate', type: 'pill', height: 340, width: 150, xOffset: -50, color: '#334155', eyeOffsetY: 280 },
  { id: 'yellow', type: 'pill', height: 280, width: 130, xOffset: 90, color: '#fbbf24', eyeOffsetY: 240 },
  { id: 'orange', type: 'circle', height: 240, width: 240, xOffset: 200, color: '#f97316', eyeOffsetY: 65 }
];

const LoginForm = React.memo(({ email, setEmail, password, setPassword, setIsPasswordFocused, handleGoogleLogin, handleSubmit, error, loading }) => {
  return (
    <div className="login-right">
      <div className="login-form-container">
        <h1 className="login-title">Välkommen Tillbaka</h1>
        <p className="login-subtitle">Logga in för att fortsätta plugga</p>

        {error && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '16px', 
            backgroundColor: '#fee', 
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <button className="google-login-btn" onClick={handleGoogleLogin} disabled={loading}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Loggar in...' : 'Fortsätt med Google'}
        </button>

        <div className="divider"><span>eller</span></div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-post</label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din.email@exempel.se" 
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder="Ange ditt lösenord" 
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" disabled={loading} />
              <span>Kom ihåg mig</span>
            </label>
            <a href="#" className="forgot-password">Glömt lösenord?</a>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>
        <p className="signup-link">Har du inget konto? <a href="#">Registrera dig</a></p>
      </div>
    </div>
  );
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [containerRect, setContainerRect] = useState({ width: 0, height: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const leftSideRef = useRef(null);
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (leftSideRef.current) {
        const rect = leftSideRef.current.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };

    const handleResize = () => {
      if (leftSideRef.current) {
        const rect = leftSideRef.current.getBoundingClientRect();
        setContainerRect({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      // The OAuth redirect will handle navigation
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      console.error('Google login error:', err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        setLoading(true);
        setError('');
        await loginWithEmail(email, password);
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid email or password. Please try again.');
        console.error('Login error:', err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left" ref={leftSideRef} style={{ backgroundImage: `url(${loginBackground})` }}>
        <div className="background-grid" />
        <svg 
          className="blob-svg" 
          viewBox={`0 0 ${containerRect.width || 100} ${containerRect.height || 100}`}
        >
          <g>
            {SHAPES_CONFIG.map((shape) => (
              <BlobShape
                key={shape.id}
                shape={shape}
                mouseRef={mouseRef}
                isPasswordFocused={isPasswordFocused}
                containerRect={containerRect}
              />
            ))}
          </g>
        </svg>
      </div>

      <LoginForm 
        email={email} setEmail={setEmail} 
        password={password} setPassword={setPassword}
        setIsPasswordFocused={setIsPasswordFocused}
        handleGoogleLogin={handleGoogleLogin}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
};

const BlobShape = ({ shape, mouseRef, isPasswordFocused, containerRect }) => {
  const pathRef = useRef(null);
  const leftWhiteRef = useRef(null);
  const rightWhiteRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftEyelidRef = useRef(null);
  const rightEyelidRef = useRef(null);
  const leftEyeLineRef = useRef(null);
  const rightEyeLineRef = useRef(null);
  const anim = useRef({
    stretchX: 0, stretchY: 0, leanX: 0, leanY: 0,
    pupilX: 0, pupilY: 0, eyesClosed: 0
  });

  useEffect(() => {
    if (!containerRect.width) return;

    let frameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateAnimation = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2 + 150;
      const shapeX = centerX + shape.xOffset;
      const cutLineY = centerY;

      const dx = mouseX - shapeX;
      const dy = mouseY - (cutLineY - shape.height / 2);

      const s = anim.current;
      s.stretchX = lerp(s.stretchX, isPasswordFocused ? -15 : Math.max(-20, Math.min(20, dx * 0.08)), 0.1);
      s.stretchY = lerp(s.stretchY, isPasswordFocused ? 0 : Math.max(-15, Math.min(15, dy * 0.05)), 0.1);
      s.leanX = lerp(s.leanX, isPasswordFocused ? -25 : Math.max(-40, Math.min(40, dx * 0.15)), 0.1);
      s.leanY = lerp(s.leanY, isPasswordFocused ? 0 : Math.max(-30, Math.min(30, dy * 0.08)), 0.1);
      s.pupilX = lerp(s.pupilX, isPasswordFocused ? 0 : Math.max(-4, Math.min(4, dx * 0.008)), 0.08);
      s.pupilY = lerp(s.pupilY, isPasswordFocused ? 0 : Math.max(-3, Math.min(3, dy * 0.008)), 0.08);
      s.eyesClosed = lerp(s.eyesClosed, isPasswordFocused ? 1 : 0, 0.15);

      const stretchedWidth = shape.width + s.stretchX;
      const stretchedHeight = shape.height + s.stretchY;
      const halfWidth = stretchedWidth / 2;

      if (pathRef.current) {
        let d = '';
        if (shape.type === 'circle') {
          d = `M ${shapeX - halfWidth} ${cutLineY} A ${halfWidth} ${halfWidth + s.leanY * 0.5} 0 1 1 ${shapeX + halfWidth} ${cutLineY} Z`;
        } else {
          const topY = cutLineY - stretchedHeight + s.leanY;
          const topCenterY = topY + halfWidth;
          d = `M ${shapeX - halfWidth} ${cutLineY} L ${shapeX - halfWidth + s.leanX} ${topCenterY} A ${halfWidth} ${halfWidth} 0 0 1 ${shapeX + halfWidth + s.leanX} ${topCenterY} L ${shapeX + halfWidth} ${cutLineY} Z`;
        }
        pathRef.current.setAttribute('d', d);
      }

      const eyeY = cutLineY - shape.eyeOffsetY - s.stretchY * 0.5 + s.leanY * 0.7;
      const eyeSpacing = shape.type === 'circle' ? 32 : 26;
      const eyeRadius = shape.type === 'circle' ? 11 : 9;
      const lx = shapeX - eyeSpacing / 2 + s.stretchX * 0.3 + s.leanX * 0.7;
      const rx = shapeX + eyeSpacing / 2 + s.stretchX * 0.3 + s.leanX * 0.7;

      const updateEye = (white, eye, pupil, lid, line, x) => {
        white.current.setAttribute('cx', x); white.current.setAttribute('cy', eyeY);
        eye.current.setAttribute('cx', x); eye.current.setAttribute('cy', eyeY);
        pupil.current.setAttribute('cx', x + s.pupilX); pupil.current.setAttribute('cy', eyeY + s.pupilY);
        pupil.current.style.opacity = 1 - s.eyesClosed;
        lid.current.setAttribute('x', x - eyeRadius); lid.current.setAttribute('y', eyeY - eyeRadius);
        lid.current.setAttribute('height', eyeRadius * 2 * s.eyesClosed);
        lid.current.style.display = s.eyesClosed > 0.02 ? 'block' : 'none';
        line.current.setAttribute('d', `M ${x - eyeRadius} ${eyeY} Q ${x} ${eyeY + 2} ${x + eyeRadius} ${eyeY}`);
        line.current.style.opacity = s.eyesClosed > 0.85 ? (s.eyesClosed - 0.85) / 0.15 : 0;
      };

      updateEye(leftWhiteRef, leftEyeRef, leftPupilRef, leftEyelidRef, leftEyeLineRef, lx);
      updateEye(rightWhiteRef, rightEyeRef, rightPupilRef, rightEyelidRef, rightEyeLineRef, rx);

      frameId = requestAnimationFrame(updateAnimation);
    };

    frameId = requestAnimationFrame(updateAnimation);
    return () => cancelAnimationFrame(frameId);
  }, [containerRect.width, isPasswordFocused, shape]);

  if (!containerRect.width) return null;

  const pupilColor = shape.id === 'purple' ? '#1e1b4b' : shape.id === 'slate' ? '#0f172a' : shape.id === 'yellow' ? '#451a03' : '#431407';
  const eyeRadius = shape.type === 'circle' ? 11 : 9;
  const pupilRadius = shape.type === 'circle' ? 4.5 : 3.5;

  return (
    <g>
      <path ref={pathRef} fill={shape.color} />
      <defs>
        <clipPath id={`clip-l-${shape.id}`}><circle ref={leftEyeRef} r={eyeRadius} /></clipPath>
        <clipPath id={`clip-r-${shape.id}`}><circle ref={rightEyeRef} r={eyeRadius} /></clipPath>
      </defs>
      <g>
        <circle ref={leftWhiteRef} r={eyeRadius} fill="white" />
        <g clipPath={`url(#clip-l-${shape.id})`}>
          <circle ref={leftPupilRef} r={pupilRadius} fill={pupilColor} />
          <rect ref={leftEyelidRef} width={eyeRadius * 2} fill={shape.color} />
        </g>
        <path ref={leftEyeLineRef} stroke={pupilColor} strokeWidth="1.5" fill="none" />
      </g>
      <g>
        <circle ref={rightWhiteRef} r={eyeRadius} fill="white" />
        <g clipPath={`url(#clip-r-${shape.id})`}>
          <circle ref={rightPupilRef} r={pupilRadius} fill={pupilColor} />
          <rect ref={rightEyelidRef} width={eyeRadius * 2} fill={shape.color} />
        </g>
        <path ref={rightEyeLineRef} stroke={pupilColor} strokeWidth="1.5" fill="none" />
      </g>
    </g>
  );
};

export default Login;