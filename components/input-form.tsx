import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface InputFormProps {
    label: string
    name: string
    type: string
    autoComplete: string
    required: boolean
}

function InputForm({label, name, type, autoComplete, required}: InputFormProps) {
  return (
<div>
              <Label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </Label>
              <div className="mt-1 relative">
                <Input
                  id={name}
                  name={name}
                  autoComplete={autoComplete}
                  required={required}
                  type={type}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
  )
}

export default InputForm