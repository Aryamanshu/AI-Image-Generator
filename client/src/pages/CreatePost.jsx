import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null); // Clear errors when user types
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setGeneratingImg(true);
      setError(null);

      const response = await fetch('https://ai-image-generator-c188.onrender.com/api/v1/stability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      setForm({ ...form, photo: data.photo });
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.prompt.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!form.photo) {
      setError('Please generate an image first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://ai-image-generator-c188.onrender.com/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to share image');
      }

      navigate('/');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to share image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through AI and share it with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
            required
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            required
          />

          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-900 text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-auto p-4 h-80 flex justify-center items-center">
            {/* AI Model Badge */}
            <div className="absolute top-2 right-2 bg-blue-500 bg-opacity-90 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Stability AI
            </div>

            {/* Image Display */}
            <div className="relative w-full h-full flex justify-center items-center overflow-hidden rounded-lg transition-all duration-300">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-auto h-full object-contain transform hover:scale-105 transition-transform duration-300"
                  onError={() => setError('Failed to load generated image')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-8/12 h-8/12 object-contain opacity-30"
                  />
                  <p className="text-gray-400 mt-4 text-sm">Your image will appear here</p>
                </div>
              )}
            </div>

            {/* Loading Overlay */}
            {generatingImg && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-xl">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                <p className="text-white font-medium mt-4">Creating your masterpiece...</p>
                <p className="text-blue-300 text-xs mt-2">This may take a few moments</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className={`text-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
              generatingImg ? 'bg-gray-500' : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            disabled={loading || !form.photo}
            className={`mt-3 text-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
              loading || !form.photo ? 'bg-gray-400' : 'bg-[#6469ff] hover:bg-[#5156d6]'
            }`}
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;