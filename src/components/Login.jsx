import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import loginBackground from '../assets/login_background.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const leftSideRef = useRef(null);
  const [containerRect, setContainerRect] = useState({ width: 0, height: 0 });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle mouse updates to every 16ms (60fps)
      if (now - lastMouseUpdate < 16) return;
      lastMouseUpdate = now;
      
      if (leftSideRef.current) {
        const rect = leftSideRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
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
    
    // Initial resize
    handleResize();
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Get user info from Google
      const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      }).then(res => res.json());
      
      console.log('Google user info:', userInfo);
      
      const userData = {
        email: userInfo.email,
        name: userInfo.name,
        method: 'google'
      };
      
      const profilePic = userInfo.picture;
      console.log('Profile picture URL:', profilePic);
      
      login(userData, profilePic);
      navigate('/dashboard');
    },
    onError: () => {
      console.error('Google login failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Manual login with placeholder avatar
      login({ email, method: 'manual' }, null);
      navigate('/dashboard');
    }
  };

  // Shape Configuration - larger, centered, proper half-pill/half-circle shapes
  // All shapes are positioned relative to center with clean horizontal cut line
  // Ordered by z-index (back to front)
  const shapes = [
    { id: 'purple', type: 'pill', height: 380, width: 170, xOffset: -200, color: '#7c3aed', eyeOffsetY: 310 },
    { id: 'slate', type: 'pill', height: 340, width: 150, xOffset: -50, color: '#334155', eyeOffsetY: 280 },
    { id: 'yellow', type: 'pill', height: 280, width: 130, xOffset: 90, color: '#fbbf24', eyeOffsetY: 240 },
    { id: 'orange', type: 'circle', height: 240, width: 240, xOffset: 200, color: '#f97316', eyeOffsetY: 65 }
  ];

  return (
    <div className="login-container">
      {/* Left Side - Animated Shapes */}
      <div 
        className="login-left" 
        ref={leftSideRef}
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        {/* Background Grid Pattern */}
        <div className="background-grid" />
        
        {/* SVG Container for Blob Shapes */}
        <svg 
          className="blob-svg" 
          preserveAspectRatio="xMidYMid meet" 
          viewBox={`0 0 ${containerRect.width || 100} ${containerRect.height || 100}`}
        >
          <defs>
            {/* Clip paths for clean horizontal cut */}
            {shapes.map((shape) => {
              const centerX = (containerRect.width || 0) / 2;
              const centerY = (containerRect.height || 0) / 2;
              const baseX = centerX + shape.xOffset;
              
              if (shape.type === 'circle') {
                return (
                  <clipPath key={`clip-${shape.id}`} id={`clip-${shape.id}`}>
                    <rect 
                      x={baseX - shape.width / 2 - 50} 
                      y={centerY - shape.height - 50} 
                      width={shape.width + 100} 
                      height={shape.height + 50} 
                    />
                  </clipPath>
                );
              } else {
                return (
                  <clipPath key={`clip-${shape.id}`} id={`clip-${shape.id}`}>
                    <rect 
                      x={baseX - shape.width / 2 - 50} 
                      y={centerY - shape.height - 50} 
                      width={shape.width + 100} 
                      height={shape.height + 50} 
                    />
                  </clipPath>
                );
              }
            })}
          </defs>
          
          <g>
            {shapes.map((shape) => (
              <BlobShape
                key={shape.id}
                shape={shape}
                mousePosition={mousePosition}
                isPasswordFocused={isPasswordFocused}
                containerRect={containerRect}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Välkommen Tillbaka</h1>
          <p className="login-subtitle">Logga in för att fortsätta plugga</p>

          {/* Google OAuth Login */}
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Fortsätt med Google
          </button>

          <div className="divider">
            <span>eller</span>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din.email@exempel.se"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Lösenord</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Ange ditt lösenord"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Kom ihåg mig</span>
              </label>
              <a href="#" className="forgot-password">Glömt lösenord?</a>
            </div>

            <button type="submit" className="submit-btn">
              Logga in
            </button>
          </form>

          <p className="signup-link">
            Har du inget konto? <a href="#">Registrera dig</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Blob Shape Component with proper half-pill/half-circle geometry and delayed eye tracking
const BlobShape = ({ shape, mousePosition, isPasswordFocused, containerRect }) => {
  const [stretch, setStretch] = useState({ x: 0, y: 0 });
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [eyesClosed, setEyesClosed] = useState(0); // 0 = open, 1 = closed
  
  // Delayed tracking refs
  const stretchRef = useRef({ x: 0, y: 0 });
  const pupilOffsetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();

  useEffect(() => {
    if (!containerRect.width) return;

    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2 + down; // Move down
    const shapeX = centerX + shape.xOffset;
    const cutLineY = centerY; // Fixed bottom edge

    // Calculate stretch and lean based on mouse position
    const dx = mousePosition.x - shapeX;
    const dy = mousePosition.y - (cutLineY - shape.height / 2);
    
    // Subtle stretch towards mouse (vertical and horizontal)
    // Also calculate lean - how much the top moves towards mouse
    const targetStretchX = isPasswordFocused ? -15 : Math.max(-20, Math.min(20, dx * 0.08));
    const targetStretchY = isPasswordFocused ? 0 : Math.max(-15, Math.min(15, dy * 0.05));
    
    // Lean - top of shape moves towards mouse while bottom stays fixed
    const targetLeanX = isPasswordFocused ? -25 : Math.max(-40, Math.min(40, dx * 0.15));
    const targetLeanY = isPasswordFocused ? 0 : Math.max(-30, Math.min(30, dy * 0.08));

    // Eye tracking with delay
    const targetPupilX = isPasswordFocused ? 0 : Math.max(-4, Math.min(4, dx * 0.008));
    const targetPupilY = isPasswordFocused ? 0 : Math.max(-3, Math.min(3, dy * 0.008));

    // Smooth interpolation for both stretch and eyes
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    let lastUpdate = Date.now();
    const animate = () => {
      const now = Date.now();
      const delta = now - lastUpdate;
      
      // Only update every 16ms (60fps max)
      if (delta < 16) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastUpdate = now;
      
      // Smooth stretch interpolation
      stretchRef.current = {
        x: lerp(stretchRef.current.x, targetStretchX, 0.08),
        y: lerp(stretchRef.current.y, targetStretchY, 0.08),
        leanX: lerp(stretchRef.current.leanX || 0, targetLeanX, 0.08),
        leanY: lerp(stretchRef.current.leanY || 0, targetLeanY, 0.08)
      };
      
      // Smooth pupil interpolation
      pupilOffsetRef.current = {
        x: lerp(pupilOffsetRef.current.x, targetPupilX, 0.06),
        y: lerp(pupilOffsetRef.current.y, targetPupilY, 0.06)
      };
      
      setStretch(stretchRef.current);
      setPupilOffset(pupilOffsetRef.current);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isPasswordFocused, containerRect, shape]);

  // Eye closing animation
  useEffect(() => {
    const targetClosed = isPasswordFocused ? 1 : 0;
    let current = eyesClosed;
    
    const animate = () => {
      current += (targetClosed - current) * 0.15;
      if (Math.abs(current - targetClosed) < 0.01) {
        current = targetClosed;
      }
      setEyesClosed(current);
      
      if (current !== targetClosed) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isPasswordFocused]);

  if (!containerRect.width) return null;

  const down = 150; // Vertical offset to center shapes lower
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2 + down; // Move down
  const baseX = centerX + shape.xOffset;
  const cutLineY = centerY; // Clean horizontal cut line at vertical center (adjusted down)
  
  // Apply stretch to dimensions and lean to position
  const stretchedWidth = shape.width + stretch.x;
  const stretchedHeight = shape.height + stretch.y;
  const halfWidth = stretchedWidth / 2;
  const radius = shape.type === 'circle' ? stretchedWidth / 2 : stretchedWidth / 2;
  
  // Lean offsets for top of shape
  const leanX = stretch.leanX || 0;
  const leanY = stretch.leanY || 0;
  
  // Eye positions - follow the lean
  const eyeY = cutLineY - shape.eyeOffsetY - stretch.y * 0.5 + leanY * 0.7;
  const eyeSpacing = shape.type === 'circle' ? 32 : 26;
  const leftEyeX = baseX - eyeSpacing / 2 + stretch.x * 0.3 + leanX * 0.7;
  const rightEyeX = baseX + eyeSpacing / 2 + stretch.x * 0.3 + leanX * 0.7;
  const eyeRadius = shape.type === 'circle' ? 11 : 9;
  const pupilRadius = shape.type === 'circle' ? 4.5 : 3.5;
  
  // Pupil colors based on shape
  const pupilColor = shape.id === 'purple' ? '#1e1b4b' 
    : shape.id === 'slate' ? '#0f172a' 
    : shape.id === 'yellow' ? '#451a03' 
    : '#431407';

  // Generate path for half-pill or half-circle (bottom edge fixed, top leans)
  let pathD = '';
  
  if (shape.type === 'circle') {
    // True half-circle - simple semicircle that stretches
    pathD = `
      M ${baseX - halfWidth} ${cutLineY}
      A ${halfWidth} ${halfWidth + leanY * 0.5} 0 1 1 ${baseX + halfWidth} ${cutLineY}
      Z
    `;
  } else {
    // Half-pill shape - rectangle with semicircular top, leaning towards mouse
    // Ensure no corners by using smooth curves
    const topY = cutLineY - stretchedHeight + leanY;
    const topCenterY = topY + radius;
    const leftBottomX = baseX - halfWidth;
    const rightBottomX = baseX + halfWidth;
    const leftTopX = baseX - halfWidth + leanX;
    const rightTopX = baseX + halfWidth + leanX;
    
    pathD = `
      M ${leftBottomX} ${cutLineY}
      L ${leftTopX} ${topCenterY}
      A ${radius} ${radius} 0 0 1 ${rightTopX} ${topCenterY}
      L ${rightBottomX} ${cutLineY}
      Z
    `;
  }

  return (
    <g 
      style={{ 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Shape Path */}
      <path 
        d={pathD} 
        fill={shape.color} 
        className="blob-shape"
      />
      
      {/* Clip paths for eyes to constrain eyelids */}
      <defs>
        <clipPath id={`eye-clip-left-${shape.id}`}>
          <ellipse cx={leftEyeX} cy={eyeY} rx={eyeRadius} ry={eyeRadius} />
        </clipPath>
        <clipPath id={`eye-clip-right-${shape.id}`}>
          <ellipse cx={rightEyeX} cy={eyeY} rx={eyeRadius} ry={eyeRadius} />
        </clipPath>
      </defs>
      
      {/* Eyes Container - no rotation, follows stretch */}
      <g>
        {/* Left Eye */}
        <g>
          {/* Eye white */}
          <ellipse 
            cx={leftEyeX} 
            cy={eyeY} 
            rx={eyeRadius} 
            ry={eyeRadius}
            fill="white"
          />
          {/* Pupil and eyelids - clipped to eye boundary */}
          <g clipPath={`url(#eye-clip-left-${shape.id})`}>
            {/* Pupil */}
            <circle 
              cx={leftEyeX + pupilOffset.x} 
              cy={eyeY + pupilOffset.y} 
              r={pupilRadius}
              fill={pupilColor}
              style={{ 
                opacity: 1 - eyesClosed,
                transition: 'opacity 0.2s ease'
              }}
            />
            {/* Eyelids - now constrained within eye boundary */}
            {eyesClosed > 0.02 && (
              <rect
                x={leftEyeX - eyeRadius}
                y={eyeY - eyeRadius}
                width={eyeRadius * 2}
                height={eyeRadius * 2 * eyesClosed}
                fill={shape.color}
              />
            )}
          </g>
          {/* Eyelid line when closed */}
          {eyesClosed > 0.85 && (
            <path
              d={`M ${leftEyeX - eyeRadius} ${eyeY} Q ${leftEyeX} ${eyeY + 2} ${leftEyeX + eyeRadius} ${eyeY}`}
              stroke={pupilColor}
              strokeWidth="1.5"
              fill="none"
              opacity={Math.min(1, (eyesClosed - 0.85) / 0.15)}
              style={{ transition: 'opacity 0.15s ease' }}
            />
          )}
        </g>
        
        {/* Right Eye */}
        <g>
          {/* Eye white */}
          <ellipse 
            cx={rightEyeX} 
            cy={eyeY} 
            rx={eyeRadius} 
            ry={eyeRadius}
            fill="white"
          />
          {/* Pupil and eyelids - clipped to eye boundary */}
          <g clipPath={`url(#eye-clip-right-${shape.id})`}>
            {/* Pupil */}
            <circle 
              cx={rightEyeX + pupilOffset.x} 
              cy={eyeY + pupilOffset.y} 
              r={pupilRadius}
              fill={pupilColor}
              style={{ 
                opacity: 1 - eyesClosed,
                transition: 'opacity 0.2s ease'
              }}
            />
            {/* Eyelids - now constrained within eye boundary */}
            {eyesClosed > 0.02 && (
              <rect
                x={rightEyeX - eyeRadius}
                y={eyeY - eyeRadius}
                width={eyeRadius * 2}
                height={eyeRadius * 2 * eyesClosed}
                fill={shape.color}
              />
            )}
          </g>
          {/* Eyelid line when closed */}
          {eyesClosed > 0.85 && (
            <path
              d={`M ${rightEyeX - eyeRadius} ${eyeY} Q ${rightEyeX} ${eyeY + 2} ${rightEyeX + eyeRadius} ${eyeY}`}
              stroke={pupilColor}
              strokeWidth="1.5"
              fill="none"
              opacity={Math.min(1, (eyesClosed - 0.85) / 0.15)}
              style={{ transition: 'opacity 0.15s ease' }}
            />
          )}
        </g>
      </g>
    </g>
  );
};

export default Login;
