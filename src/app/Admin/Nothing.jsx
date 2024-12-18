import React from 'react'

export default function Nothing({name}) {
  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-md mt-5">
        <p className="flex items-center">
            <span className="mr-2">📁 No {name} uploaded yet.</span>
            <span>To upload, please send them to</span>
            <a href='https://wa.me/09034954069' className="ml-1 text-blue-500">Whatsapp</a>.
        </p>
    </div>
  )
}
