import React from 'react';

type Props = {
  label?: React.ReactNode;
  error?: any;
} & React.ComponentPropsWithoutRef<'input'>;

const InputField = ({ label, error, ...rest }: Props) => {
  return (
    <div className="d-flex flex-column">
      {typeof label === 'string'
        ? label && (
            <label>
              <strong>{label}</strong>
            </label>
          )
        : label}
      <input
        {...rest}
        className={`${rest.className} form-control regi-input mt-1 ${
          error ? 'is-invalid' : ''
        }`}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};
export default InputField;
