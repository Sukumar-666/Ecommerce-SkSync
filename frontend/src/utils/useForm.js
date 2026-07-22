import { useState, useCallback } from "react";

/**
 * useForm - a small reusable controlled-form hook.
 *
 * @param {object} initialValues  starting field values
 * @param {object} validators     map of fieldName -> (value, allValues) => errorString
 */
export default function useForm(initialValues, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }

  const validateField = useCallback(
    (name, value, allValues) => {
      const validator = validators[name];
      if (!validator) return "";
      return validator(value, allValues) || "";
    },
    [validators]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, type, value, checked } = e.target;
      const nextValue = type === "checkbox" ? checked : value;
      setValues((prev) => {
        const next = { ...prev, [name]: nextValue };
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, nextValue, next) }));
        return next;
      });
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const nextErrors = {};
    Object.keys(validators).forEach((name) => {
      nextErrors[name] = validateField(name, values[name], values);
    });
    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => !msg);
  }, [validators, values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, status, setStatus, setValues, handleChange, validateAll, reset };
}
