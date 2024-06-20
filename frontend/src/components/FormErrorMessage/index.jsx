import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'

export default function FormErrorMessage(props) {
    return (
        <ErrorMessage
            {...props}
            render={({ messages }) => {
                console.log('messages', messages)
                return messages
                    ? Object.entries(messages).map(([type, message]) => (
                          <p
                              key={type}
                              className="mt-2 flex text-sm font-medium leading-6 text-red-700"
                          >
                              <ExclamationTriangleIcon className="mr-2 size-6" />
                              {message}
                          </p>
                      ))
                    : null
            }}
        />
    )
}
