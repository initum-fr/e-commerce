import React, { useState, useRef } from 'react'

const ImageUpload = ({ onImageUpload }) => {
    const fileInputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [uploadType, setUploadType] = useState('file')

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setError(null)
        setPreviewUrl(URL.createObjectURL(file))
        setLoading(true)

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch(
                'http://localhost:8000/images/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            onImageUpload(data.imageUrl)
            setLoading(false)
        } catch (error) {
            console.error('Upload error:', error)
            setError('Failed to upload image')
            setLoading(false)
        }
    }

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value)
        setPreviewUrl(e.target.value)
        setError(null)
    }

    const handleUpload = async () => {
        if (uploadType === 'url') {
            onImageUpload(imageUrl)
            return
        }

        if (!fileInputRef.current.files[0]) return
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('image', fileInputRef.current.files[0])

        try {
            const response = await fetch(
                'http://localhost:8000/images/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            onImageUpload(data.imageUrl)
            setLoading(false)
        } catch (error) {
            console.error('Upload error:', error)
            setError('Failed to upload image')
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={loading}
                />
                <button
                    type="button"
                    onClick={() => {
                        setUploadType('file')
                        fileInputRef.current?.click()
                    }}
                    disabled={loading}
                    className={`rounded-md px-4 py-2 transition-all duration-200 ${
                        uploadType === 'file'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    } ${loading && 'cursor-not-allowed opacity-50'}`}
                >
                    {loading ? 'Uploading...' : 'Upload File'}
                </button>
                <button
                    type="button"
                    onClick={() => setUploadType('url')}
                    disabled={loading}
                    className={`rounded-md px-4 py-2 transition-all duration-200 ${
                        uploadType === 'url'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    } ${loading && 'cursor-not-allowed opacity-50'}`}
                >
                    Use URL
                </button>
            </div>

            {uploadType === 'url' && (
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={handleUrlChange}
                        placeholder="Enter image URL"
                        disabled={loading}
                        className={`flex-1 rounded-md border border-gray-300 px-4 py-2 transition-all duration-200 ${
                            loading && 'cursor-not-allowed opacity-50'
                        }`}
                    />
                    <button
                        onClick={handleUpload}
                        disabled={!imageUrl || loading}
                        className={`rounded-md px-4 py-2 transition-all duration-200 ${
                            !imageUrl || loading
                                ? 'cursor-not-allowed bg-gray-300 opacity-50'
                                : 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow'
                        }`}
                    >
                        Use URL
                    </button>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
            {previewUrl && (
                <div className="h-32 w-32">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full rounded-md object-cover shadow-sm"
                    />
                </div>
            )}
        </div>
    )
}

export default ImageUpload
