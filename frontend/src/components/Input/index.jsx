import PropTypes from 'prop-types'
export default function Input({
    type,
    name,
    id,
    placeholder,
    required,
    value,
    onChange,
    step,
}) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required={required}
            step={step}
        />
    )
}
Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    step: PropTypes.string,
}
