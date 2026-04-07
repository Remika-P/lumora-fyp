import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon } from "./icons";


const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F5F1ED",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif",
  },

  blurElement1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(217,204,189,0.2) 0%, rgba(217,204,189,0) 70%)",
    borderRadius: "50%",
    top: "-150px",
    left: "-150px",
    filter: "blur(60px)",
  },

  blurElement2: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background:
      "radial-gradient(circle, rgba(200,189,170,0.15) 0%, rgba(200,189,170,0) 70%)",
    borderRadius: "50%",
    bottom: "-200px",
    right: "-200px",
    filter: "blur(60px)",
  },

  wrapper: {
    width: "100%",
    maxWidth: "460px",
    zIndex: 2,
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    padding: "60px 40px",
    borderRadius: "28px",
    backdropFilter: "blur(25px)",
    boxShadow:
      "0 40px 80px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
  },

  cardTitle: {
    fontSize: "38px",
    fontFamily: "'Playfair Display', serif",
    textAlign: "center",
    color: "#5A4A3F",
    marginBottom: "12px",
  },

  cardSubtitle: {
    textAlign: "center",
    color: "#9B8B7E",
    marginBottom: "40px",
  },

  formGroup: {
    marginBottom: "22px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
    color: "#5A4A3F",
    textTransform: "uppercase",
  },

  inputWrapper: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#C8BDAA",
  },

  input: {
    width: "100%",
    padding: "14px 14px 14px 44px",
    borderRadius: "14px",
    border: "2px solid #E8DDD0",
    outline: "none",
    fontSize: "14px",
  },

  inputFocus: {
    borderColor: "#D9CCBD",
    boxShadow: "0 0 0 4px rgba(217,204,189,0.2)",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    background: "#D9CCBD",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
  },

  buttonHover: {
    background: "#C8BDAA",
  },

  errorMessage: {
    background: "#F8D7DA",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "16px",
    color: "#842029",
    fontSize: "14px",
  },

  successMessage: {
    background: "#D1E7DD",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "16px",
    color: "#0F5132",
    fontSize: "14px",
  },

  authText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#9B8B7E",
  },

  link: {
    color: "#C8BDAA",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },
};

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focus, setFocus] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Fill all fields");
      return false;
    }
    if (form.password.length < 8) {
      setError("Password must be 8+ chars");
      return false;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   if (!validate()) return;

  //   setLoading(true);

  //   try {
  //     await new Promise((r) => setTimeout(r, 1000)); // fake API
  //     setSuccess("Account created!");
  //     setTimeout(() => navigate("/login"), 1200);
  //   } catch {
  //     setError("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!validate()) return;

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(data.message || "OTP sent!");
      
      // 👉 redirect to OTP page (IMPORTANT)
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: form.email } });
      }, 1200);

    } else {
      setError(data.message || "Signup failed");
    }

  } catch (err) {
    console.error(err);
    setError("Cannot connect to server");
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (field) => ({
    ...styles.input,
    ...(focus === field ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.container}>
      <div style={styles.blurElement1}></div>
      <div style={styles.blurElement2}></div>

      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.cardTitle}>Create Account</h1>
          <p style={styles.cardSubtitle}>
            Join us to start planning your décor
          </p>

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && (
            <div style={styles.successMessage}>
              <CheckIcon size={16} /> {success}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <UserIcon size={18} />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocus("name")}
                  onBlur={() => setFocus(null)}
                  style={inputStyle("name")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <MailIcon size={18} />
                </div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus(null)}
                  style={inputStyle("email")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={18} />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus(null)}
                  style={inputStyle("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                  }}
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon size={18} />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  onFocus={() => setFocus("confirm")}
                  onBlur={() => setFocus(null)}
                  style={inputStyle("confirm")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                  }}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p style={styles.authText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;