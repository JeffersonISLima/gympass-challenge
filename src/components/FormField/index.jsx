import React from 'react';

const FormField = ({ className, type, placeholder, name, ...props }) => {
  return (
    <>
      <input className={className} type={type} placeholder={placeholder} name={name} onChange={e => props.onChange(e)} />
      <i className="fas fa-search"></i>
    </>
  );
}
export default FormField;