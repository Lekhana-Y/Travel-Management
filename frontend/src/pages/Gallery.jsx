import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import "../styles/gallery.css";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);

    const fetchImages = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/gallery`);
            setImages(res.data.data);
        } catch (err) {
            console.error("Failed to load images:", err);
        }
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image.");
        const formData = new FormData();
        formData.append("image", file);

        try {
            await axios.post(`${BASE_URL}/gallery`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFile(null);
            fetchImages();
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed");
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="gallery__container">
            <h3>Tour Gallery</h3>

            <form onSubmit={uploadImage}>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                <button className="btn primary__btn" type="submit">Add Image</button>
            </form>

            <div className="gallery__grid mt-4 d-flex flex-wrap gap-3">
                {images.map((img) => (
                    <div className="gallery__item" key={img._id}>
                        <img
                            src={`http://localhost:4000${img.imageUrl}`}
                            alt="tour"
                            style={{ width: "200px", borderRadius: "10px" }}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
