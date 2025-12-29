import { useState, useEffect, useRef } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const leftSideRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (leftSideRef.current) {
        const rect = leftSideRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    // Implement login logic here
  };

  // Generate multiple shapes with different positions and colors
  const shapes = [
    { id: 1, type: 'circle', color: '#34d399', size: 120, top: '15%', left: '20%' },
    { id: 2, type: 'square', color: '#6ee7b7', size: 100, top: '45%', left: '65%' },
    { id: 3, type: 'triangle', color: '#a7f3d0', size: 110, top: '70%', left: '25%' },
    { id: 4, type: 'circle', color: '#d1fae5', size: 90, top: '25%', left: '70%' },
    { id: 5, type: 'square', color: '#10b981', size: 85, top: '60%', left: '50%' },
  ];

  return (
    <div className="login-container">
      {/* Left Side - Animated Shapes */}
      <div className="login-left" ref={leftSideRef}>
        <div className="shapes-container">
          {shapes.map((shape) => (
            <Shape
              key={shape.id}
              shape={shape}
              mousePosition={mousePosition}
              isPasswordFocused={isPasswordFocused}
              containerRef={leftSideRef}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue your journey</p>

          {/* Google Login Button */}
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Shape Component with Eyes
const Shape = ({ shape, mousePosition, isPasswordFocused, containerRef }) => {
  const shapeRef = useRef(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [stretchTransform, setStretchTransform] = useState({ scaleX: 1, scaleY: 1, rotate: 0 });

  useEffect(() => {
    if (!shapeRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate center based on percentage positions for stability
    const centerX = (parseFloat(shape.left) / 100) * containerRect.width;
    const centerY = (parseFloat(shape.top) / 100) * containerRect.height;

    if (isPasswordFocused) {
      // Look away when password is focused
      setPupilPosition({ x: -7, y: 0 });
      setStretchTransform({ scaleX: 1, scaleY: 1, rotate: 0 });
    } else {
      // Calculate angle and distance to mouse
      const dx = mousePosition.x - centerX;
      const dy = mousePosition.y - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate pupil position (limited range inside the eye)
      const maxPupilMove = 6;
      const pupilX = Math.cos(angle) * Math.min(maxPupilMove, distance / 20);
      const pupilY = Math.sin(angle) * Math.min(maxPupilMove, distance / 20);
      setPupilPosition({ x: pupilX, y: pupilY });

      // Calculate stretch effect - stretch towards the mouse
      const maxStretch = 1.2;
      const stretchAmount = 1 + Math.min(distance / 1000, 0.2);
      
      setStretchTransform({
        scaleX: stretchAmount,
        scaleY: 1 / Math.sqrt(stretchAmount), // Maintain approximate area
        rotate: angle // Rotate to face mouse
      });
    }
  }, [mousePosition, isPasswordFocused, containerRef, shape.left, shape.top]);

  const renderShape = () => {
    const pupilStyle = {
      transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
      transition: isPasswordFocused ? 'transform 0.5s ease' : 'transform 0.05s linear'
    };

    // The shape stretches towards the mouse, but we counter-rotate the eyes 
    // so they stay relatively upright and readable
    const shapeStyle = {
      transform: `rotate(${stretchTransform.rotate}rad) scaleX(${stretchTransform.scaleX}) scaleY(${stretchTransform.scaleY})`,
      transition: isPasswordFocused ? 'transform 0.5s ease' : 'transform 0.1s linear',
      backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent'
    };

    const eyesContainerStyle = {
      transform: `rotate(${-stretchTransform.rotate}rad)`,
      transition: isPasswordFocused ? 'transform 0.5s ease' : 'transform 0.1s linear'
    };

    const renderEyes = () => (
      <div className="eyes" style={eyesContainerStyle}>
        <div className="eye">
          <div className="pupil" style={pupilStyle}></div>
        </div>
        <div className="eye">
          <div className="pupil" style={pupilStyle}></div>
        </div>
      </div>
    );

    switch (shape.type) {
      case 'circle':
        return (
          <div className="shape circle" style={shapeStyle}>
            {renderEyes()}
          </div>
        );
      case 'square':
        return (
          <div className="shape square" style={shapeStyle}>
            {renderEyes()}
          </div>
        );
      case 'triangle':
        return (
          <div className="shape triangle-container" style={shapeStyle}>
            <div className="triangle" style={{ borderBottomColor: shape.color }}></div>
            <div className="triangle-eyes-wrapper">
              {renderEyes()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={shapeRef}
      className="shape-wrapper"
      style={{
        position: 'absolute',
        top: shape.top,
        left: shape.left,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
      }}
    >
      {renderShape()}
    </div>
  );
};

export default Login;
