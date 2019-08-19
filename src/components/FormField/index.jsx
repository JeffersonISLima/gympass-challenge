import React from 'react';

const FormField = ({ className, type, placeholder, name, ...props }) => {
  return (
    <>
      <input className={className} type={type} placeholder={placeholder} name={name} onChange={e => props.onChange(e)} />
      &#128269; {/* Ícone Lupa */}
    </>
  );
}
export default FormField;