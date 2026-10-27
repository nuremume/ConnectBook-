export interface PasswordStrength {
  score: number; // 0 - 100
  label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Excellent";
  colorClass: string;
  hasLength: boolean;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  feedback: string;
}

export const evaluatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: "Very Weak",
      colorClass: "bg-slate-200 dark:bg-slate-700",
      hasLength: false,
      hasLower: false,
      hasUpper: false,
      hasNumber: false,
      hasSpecial: false,
      feedback: "Enter a password with at least 8 characters",
    };
  }

  const hasLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let criteriaCount = 0;
  if (hasLength) criteriaCount += 1;
  if (hasLower) criteriaCount += 1;
  if (hasUpper) criteriaCount += 1;
  if (hasNumber) criteriaCount += 1;
  if (hasSpecial) criteriaCount += 1;

  if (password.length >= 12) criteriaCount += 1;

  let score = Math.min(100, Math.round((criteriaCount / 6) * 100));

  let label: PasswordStrength["label"] = "Weak";
  let colorClass = "bg-rose-500";
  let feedback = "Add a mix of uppercase, numbers, and symbols.";

  if (score < 30) {
    label = "Very Weak";
    colorClass = "bg-rose-500";
    feedback = "Password must have at least 8 characters.";
  } else if (score < 50) {
    label = "Weak";
    colorClass = "bg-orange-500";
    feedback = "Try adding uppercase letters and numbers.";
  } else if (score < 75) {
    label = "Fair";
    colorClass = "bg-amber-500";
    feedback = "Good start. Add special characters for stronger security.";
  } else if (score < 90) {
    label = "Strong";
    colorClass = "bg-emerald-500";
    feedback = "Strong password! Meets security best practices.";
  } else {
    label = "Excellent";
    colorClass = "bg-emerald-600";
    feedback = "Excellent! Highly resilient against dictionary attacks.";
  }

  return {
    score,
    label,
    colorClass,
    hasLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    feedback,
  };
};

export const validateName = (name: string, fieldName: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return `${fieldName} is required`;
  }
  if (trimmed.length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  if (!/^[a-zA-Z\u00C0-\u024F\u1200-\u137F\u0600-\u06FF\s'-]+$/.test(trimmed)) {
    return `${fieldName} contains invalid special characters`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Email address is required";
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address (e.g. name@domain.com)";
  }
  return null;
};

export const validateDateOfBirth = (dobString: string): { isValid: boolean; error: string | null; age: number | null } => {
  if (!dobString) {
    return { isValid: false, error: "Date of birth is required", age: null };
  }

  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) {
    return { isValid: false, error: "Please enter a valid date", age: null };
  }

  const today = new Date();
  if (birthDate > today) {
    return { isValid: false, error: "Date of birth cannot be in the future", age: null };
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 13) {
    return { isValid: false, error: "You must be at least 13 years old to register", age };
  }
  if (age > 120) {
    return { isValid: false, error: "Please enter a realistic date of birth", age };
  }

  return { isValid: true, error: null, age };
};
