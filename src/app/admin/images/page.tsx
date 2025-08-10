'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ImageData {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  alt: string;
  size: number;
  mimeType: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ImagesResponse {
  images: ImageData[];
  total: number;
  hasMore: boolean;
}

export default function AdminImagesPage(): JSX.Element {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images', {
        credentials: 'include',
      });

      console.log('Images fetch response status:', response.status);

      if (response.ok) {
        const data: ImagesResponse = await response.json();
        console.log('Images data received:', data);
        setImages(data.images);
      } else if (response.status === 401) {
        console.log('Unauthorized - redirecting to login');
        router.push('/admin/login');
      } else {
        console.error('Failed to fetch images:', response.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('alt', altText);

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages([newImage, ...images]);
        setSelectedFile(null);
        setAltText('');
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const error = await response.json();
        alert(error.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
    setEditAlt(image.alt);
  };

  const handleUpdate = async () => {
    if (!editingImage) return;

    try {
      const response = await fetch(`/api/images/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alt: editAlt }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setImages(images.map((img) => (img.id === updatedImage.id ? updatedImage : img)));
        setEditingImage(null);
        setEditAlt('');
      } else {
        const error = await response.json();
        alert(error.error || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Update failed');
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setImages(images.filter((img) => img.id !== imageId));
      } else {
        const error = await response.json();
        alert(error.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Delete failed');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
          <p className="mt-2 text-gray-600">Upload and manage images for your blog posts</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
                Select Image
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
            <div>
              <label htmlFor="alt-text" className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text (Optional)
              </label>
              <input
                id="alt-text"
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the image for accessibility"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Uploaded Images ({images.length})</h2>
          </div>
          <div className="p-6">
            {images.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No images uploaded yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={image.url}
                        alt={image.alt || image.originalName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{image.originalName}</h3>
                      <p className="text-sm text-gray-500 mt-1">{formatFileSize(image.size)}</p>
                      <p className="text-sm text-gray-500">{image.mimeType}</p>
                      {image.alt && <p className="text-sm text-gray-600 mt-2">Alt: {image.alt}</p>}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Copy URL
                        </button>
                        <button
                          onClick={() => handleEdit(image)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
              <div className="mb-4">
                <label htmlFor="edit-alt" className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  id="edit-alt"
                  type="text"
                  value={editAlt}
                  onChange={(e) => setEditAlt(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
