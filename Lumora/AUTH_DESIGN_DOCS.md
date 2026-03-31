# Lumora Authentication Pages - Design Documentation

## Overview
Professional, aesthetic login and signup pages built with React, featuring a warm beige/tan color palette and modern UI/UX patterns.

## Color Palette
```
Primary Colors:
- Warm Tan (Primary):     #D9CCBD
- Darker Tan (Secondary): #C8BDAA
- Off-White (Background): #F5F1ED / #EAE0D5

Text Colors:
- Dark Brown (Headers):   #5A4A3F
- Medium Brown (Body):    #9B8B7E
- Light Brown (Secondary):#B8A89D

Accent Colors:
- Error Red:    #FCE8E6 (light) / #B71C1C (dark)
- Success Green: #E8F5E9 (light) / #2E7D32 (dark)
- Warning Gold:  #FFC107
```

## Features

### Login Page
✨ **Professional Login Experience**
- Email validation with proper error messaging
- Password field with secure masking
- "Keep me signed in" checkbox option
- Remember password functionality
- Forgot password link
- Redirect to signup page
- Loading states with visual feedback
- Success/Error notifications
- Smooth animations and transitions
- Responsive design

### Signup Page
✨ **Comprehensive Registration Flow**
- Full name input field
- Email validation
- Password field with strength indicator
  - Real-time strength calculation
  - Color-coded feedback (Red → Yellow → Green)
  - 8+ characters minimum requirement
- Confirm password field with matching validation
- Form validation with helpful error messages
- Terms of Service & Privacy Policy links
- Redirect to login page
- Loading states with visual feedback
- Success handling with automatic redirect
- Smooth animations and transitions

## Design Patterns

### Input Fields
- **Size**: 14px padding (14x16px) for comfortable interaction
- **Border**: 2px solid with focus states
- **Focus State**: Colored border + subtle shadow
- **Background**: Slightly off-white (#FAFAF9) for visual hierarchy
- **Rounded Corners**: 12px for modern appearance

### Buttons
- **Style**: Uppercase, modern appearance
- **Colors**: Warm tan (#D9CCBD) with hover state (#C8BDAA)
- **Hover Effect**: Color change + elevation (shadow) + slight upward movement
- **Loading State**: Disabled appearance with spinner emoji
- **Accessibility**: Disabled state with reduced opacity

### Animations
- **Fade In**: 0.6s ease-out on container
- **Slide Down**: 0.6s ease-out on logo
- **Smooth Transitions**: 0.3s cubic-bezier for all interactions
- **Hover Effects**: Instant feedback on interactive elements

### Typography
- **Font Family**: Segoe UI, system fonts for better performance
- **Headers**: 32px, bold (#5A4A3F)
- **Labels**: 13px uppercase, letter-spaced (#5A4A3F)
- **Body**: 14-15px, medium weight (#9B8B7E)

## Component Structure

### Login.jsx
```
Container (gradient background)
├── Wrapper (max-width: 440px)
│   ├── Header
│   │   ├── Logo (SVG/Fallback)
│   │   ├── Title ("Lumora")
│   │   └── Subtitle ("Welcome Back")
│   └── Card
│       ├── Notifications (Error/Success)
│       ├── Form
│       │   ├── Email Input
│       │   ├── Password Input
│       │   ├── Remember Me Checkbox
│       │   └── Sign In Button
│       ├── Sign Up Link
│       ├── Divider
│       └── Forgot Password Link
```

### Signup.jsx
```
Container (gradient background)
├── Wrapper (max-width: 440px)
│   ├── Header
│   │   ├── Logo (SVG/Fallback)
│   │   ├── Title ("Lumora")
│   │   └── Subtitle ("Start Your Journey")
│   └── Card
│       ├── Notifications (Error/Success)
│       ├── Form
│       │   ├── Name Input
│       │   ├── Email Input
│       │   ├── Password Input (with strength indicator)
│       │   ├── Confirm Password Input
│       │   └── Create Account Button
│       ├── Sign In Link
│       ├── Divider
│       └── Terms & Privacy Links
```

## Validation Rules

### Email Validation
- Must match pattern: `name@domain.extension`
- Real-time validation feedback

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- Recommended: Special character

### Form Submission
- All fields required
- Email format validation
- Password match validation
- Loading state prevents multiple submissions

## API Integration

### Login Endpoint
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Signup Endpoint
```
POST /api/auth/signup
Body: { name, email, password }
Response: { success: boolean, message: string }
Redirect: /verify-otp
```

## Accessibility Features
✓ ARIA labels on form fields
✓ Keyboard navigation support
✓ Focus states visible on all interactive elements
✓ Color contrast meets WCAG standards
✓ Reduced motion support for users with vestibular disorders
✓ Error messages clearly linked to form fields

## Responsive Breakpoints
- **Desktop**: Full width up to 440px max-width
- **Tablet**: 768px and below - optimized spacing
- **Mobile**: 480px and below - larger touch targets, 16px font on inputs

## File Structure
```
Lumora/
├── public/
│   └── lumora-logo.svg          (Brand logo)
└── src/
    ├── Login.jsx                 (Login page component)
    ├── Signup.jsx                (Signup page component)
    └── index.css                 (Global styles & animations)
```

## Usage

### Import Components
```jsx
import Login from './Login';
import Signup from './Signup';
```

### Set Up Routes
```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
```

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 13+, Chrome Android 90+

## Performance Optimizations
✓ Inline styles for reduced bundle size
✓ CSS animations use GPU-accelerated properties
✓ Minimal re-renders through proper state management
✓ SVG logo for perfect scaling and small file size
✓ No external icon libraries required

## Future Enhancements
- [ ] Social login integration (Google, GitHub)
- [ ] Two-factor authentication
- [ ] OAuth2 integration
- [ ] Biometric authentication
- [ ] Email verification flow
- [ ] Password strength requirements display
- [ ] Terms of Service modal
- [ ] Privacy Policy modal

## Notes for Developers
- All colors are defined in hex format in the styles object
- Animations are defined inline in components for easier customization
- Global styles in `index.css` provide base styling and animations
- Logo has fallback text ("L") if SVG fails to load
- All form fields are disabled during submission to prevent duplicate requests
- Error messages are user-friendly and actionable

---

**Design by**: Senior React Developer
**Last Updated**: March 26, 2026
**Version**: 1.0
