'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostEditorProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    published: boolean;
    metaTitle?: string;
    metaDescription?: string;
  };
  isEditing?: boolean;
}

export default function PostEditor({ post, isEditing = false }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [published, setPublished] = useState(post?.published || false);
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/posts/${post?.slug}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          published,
          metaTitle,
          metaDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/admin/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save post');
      }
    } catch (error) {
      setError('An error occurred while saving the post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/posts/${post?.slug}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          published: false, // Always save as draft
          metaTitle,
          metaDescription,
        }),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save draft');
      }
    } catch (error) {
      setError('An error occurred while saving the draft');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {showPreview ? (
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || 'Untitled Post'}</h1>
            {excerpt && <p className="text-lg text-gray-600 mb-6 italic">{excerpt}</p>}
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans">{content}</pre>
            </div>
          </div>
        ) : (
          <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter post title..."
                  />
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of the post..."
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    rows={20}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="Write your post content in Markdown..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    You can use Markdown formatting. Supports headers, links, code blocks, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Custom title for search engines..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to use the post title. Recommended: 50-60 characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="metaDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description for search engines..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to use the excerpt. Recommended: 150-160 characters.
                  </p>
                </div>
              </div>
            </div>

            {/* Publish Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Publish Settings</h3>
                  <p className="text-sm text-gray-500">Control the visibility of your post</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : published ? 'Publish' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

