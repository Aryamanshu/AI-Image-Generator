import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, FormField } from '../components';
import { logo2 } from '../assets';

const RenderCards = ({ data }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  // This empty state is now handled by the component below
  return null;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://ai-image-generator-c188.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Stability AI branding */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-10 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              AI Image Gallery
              <span className="block text-blue-200 mt-1">Powered by Stability AI</span>
            </h1>
            <p className="mt-4 text-blue-100 text-base sm:text-lg max-w-xl">
              Browse through a collection of imaginative and visually stunning images generated by Stability AI's cutting-edge technology.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/create-post" className="px-5 py-2.5 bg-white text-blue-600 font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Image
              </Link>
              <a href="https://stability.ai/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                Learn About Stability AI
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="relative w-full max-w-xs mx-auto">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-lg transform rotate-12 opacity-80"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-400 rounded-lg transform -rotate-12 opacity-80"></div>
              <div className="relative bg-white p-4 rounded-lg shadow-lg transform rotate-3">
                {/* Stability AI Logo */}
                <div className="w-full h-auto rounded flex items-center justify-center">
                  <img src={logo2} alt="Stability AI Logo" className="w-full h-auto max-h-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mt-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Discover AI Creations
          </h2>
          <div className="relative">
            <FormField
              labelName=""
              type="text"
              name="text"
              placeholder="Search by creator name or prompt..."
              value={searchText}
              handleChange={handleSearchChange}
              className="search-input"
            />
            {searchText && (
              <button
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchText('');
                  setSearchedResults(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <p className="text-sm text-gray-500 mr-2">Popular searches:</p>
            {['landscape', 'portrait', 'sci-fi', 'fantasy', 'abstract'].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors duration-200"
                onClick={() => setSearchText(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-20">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading amazing AI creations...</p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                {searchText ? (
                  <h2 className="font-bold text-gray-800 text-xl">
                    Results for <span className="text-blue-600">"{searchText}"</span>
                    {searchedResults && (
                      <span className="text-gray-500 text-base font-normal ml-2">({searchedResults.length} images)</span>
                    )}
                  </h2>
                ) : (
                  <h2 className="font-bold text-gray-800 text-xl">
                    Recent Creations
                    {allPosts && (
                      <span className="text-gray-500 text-base font-normal ml-2">({allPosts.length} images)</span>
                    )}
                  </h2>
                )}
              </div>

              {/* View options - for future functionality */}
              <div className="flex space-x-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No images found. Try a different search term."
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No images yet. Start by creating one!"
                />
              )}
            </div>

            {/* Empty state */}
            {((searchText && searchedResults?.length === 0) || (!searchText && allPosts?.length === 0)) && (
              <div className="flex flex-col items-center justify-center py-10">
                {/* Empty state illustration */}
                <div className="w-48 h-48 mb-6 opacity-80">
                  <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="192" height="192" rx="96" fill="#F3F4F6" fillOpacity="0.5"/>
                    <path d="M96 56C74.46 56 57 73.46 57 95C57 116.54 74.46 134 96 134C117.54 134 135 116.54 135 95C135 73.46 117.54 56 96 56ZM96 128C77.77 128 63 113.23 63 95C63 76.77 77.77 62 96 62C114.23 62 129 76.77 129 95C129 113.23 114.23 128 96 128Z" fill="#0099FF"/>
                    <path d="M123 89H102V68C102 65.79 100.21 64 98 64H94C91.79 64 90 65.79 90 68V89H69C66.79 89 65 90.79 65 93V97C65 99.21 66.79 101 69 101H90V122C90 124.21 91.79 126 94 126H98C100.21 126 102 124.21 102 122V101H123C125.21 101 127 99.21 127 97V93C127 90.79 125.21 89 123 89Z" fill="#0099FF"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg mb-4">
                  {searchText ? "No images found for your search" : "No images have been created yet"}
                </p>
                <Link to="/create-post" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Your First Image
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-10 border-t border-gray-200 pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600 mr-2">Stability</span>
              <span className="font-bold text-xl text-gray-800">Gallery</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Powered by Stability AI's cutting-edge technology</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://stability.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              About
            </a>
            <a href="https://stability.ai/blog" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Blog
            </a>
            <a href="https://stability.ai/contact" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AI Image Gallery. All images are generated by Stability AI.
        </div>
      </footer>
    </section>
  );
};

export default Home;