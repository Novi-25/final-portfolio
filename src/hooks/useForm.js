import { useState, useEffect } from 'react';

const useForm = (initialValues = {}, validate = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Validate when values change and form is dirty
  useEffect(() => {
    if (validate && Object.keys(touched).length > 0) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, touched, validate]);
  
  // Handle input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle input blur
  const handleBlur = (event) => {
    const { name } = event.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
  };
  
  // Reset form to initial state
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitError(null);
  };
  
  // Handle form submission
  const handleSubmit = async (event, onSubmit) => {
    event.preventDefault();
    
    // Run full validation
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    
    // Touch all fields to show validation errors
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        await onSubmit(values);
        setIsSubmitted(true);
        setSubmitError(null);
      } catch (error) {
        setSubmitError(error.message || 'Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

export default useForm;