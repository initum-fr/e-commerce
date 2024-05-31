import PropTypes from 'prop-types'
export default function Label({ htmlFor, label }) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            {label}
        </label>
    )
}
Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
