import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateQuote = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData
      );
      console.log("API response:", response.data);

      const imageUrls = response.data
        .filter((item) => item.type === "IMAGE")
        .map((item) => item.url);

      return imageUrls;
    } catch (error) {

      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mediaUrls = await uploadImage();

    if (mediaUrls && mediaUrls.length > 0) {
      try {
        await axios.post(
          "https://assignment.stage.crafto.app/postQuote",
          { text, mediaUrls },
          { headers: { Authorization: token } }
        );
        toast.success("Quote created successfully!"); 
        navigate("/quotes");
      } catch (error) {
        toast.error("Error creating quote."); 
        console.error("Error creating quote:", error);
      }
    } else {
      toast.error("Something went wrong with image upload.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-100">
          Create a Quote
        </h2>
        <textarea
          className="w-full h-32 p-4 text-lg bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500"
          placeholder="Enter your quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <label className="block mt-6">
          <span className="sr-only">Choose File</span>
          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-105 cursor-pointer">
              {file ? file.name : "Choose File"}
            </div>
          </div>
        </label>

        <button
          type="submit"
          className="w-full mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-105"
        >
          Create Quote
        </button>
      </form>
    </div>
  );
};

export default CreateQuote;
