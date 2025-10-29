// validate.js

// Kiểm tra email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Kiểm tra số điện thoại (VN)
export const validatePhone = (phone) => {
  const re = /^(0|\+84)[0-9]{9}$/;
  return re.test(phone);
};

// Kiểm tra không rỗng
export const validateRequired = (value) => {
  return (
    value !== null && value !== undefined && value.toString().trim() !== ""
  );
};

// Kiểm tra password tối thiểu 6 ký tự
export const validatePassword = (password) => {
  return password && password.length >= 6;
};
