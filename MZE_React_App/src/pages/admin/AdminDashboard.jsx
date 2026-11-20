import { useState } from "react";
import "../../css/Admin.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("promotions");

  const menuItems = [
    { id: "promotions", label: "Promo Carousel", icon: "🖼️" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "branches", label: "Branches", icon: "📍" },
    { id: "videos", label: "Videos", icon: "🎬" },
  ];

  // PROMOTION STATES
const [promoImage, setPromoImage] = useState(null);
const [promoTitle, setPromoTitle] = useState("");
const [promoDescription, setPromoDescription] = useState("");
const [promoStartDate, setPromoStartDate] = useState("");
const [promoEndDate, setPromoEndDate] = useState("");

const [isUploading, setIsUploading] = useState(false);
const [promoMessage, setPromoMessage] = useState("");

// OTHER FILE STATES
const [productImage, setProductImage] = useState(null);
const [videoFile, setVideoFile] = useState(null);

  const handleFile = (event, setter) => {
    const file = event.target.files[0];
    if (file) setter(file);
  };

  // UPLOAD PROMOTION TO LARAVEL
const handlePromoSubmit = async (event) => {
  event.preventDefault();

  if (!promoTitle || !promoImage) {
    setPromoMessage("Please enter a title and select a promotion image.");
    return;
  }

  const formData = new FormData();

  formData.append("title", promoTitle);
  formData.append("description", promoDescription);
  formData.append("image", promoImage);
  formData.append("is_active", "1");

  if (promoStartDate) {
    formData.append("start_date", promoStartDate);
  }

  if (promoEndDate) {
    formData.append("end_date", promoEndDate);
  }

  setIsUploading(true);
  setPromoMessage("");

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/admin/promotions",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const validationErrors = data.errors
        ? Object.values(data.errors).flat().join(" ")
        : data.message;

      throw new Error(validationErrors || "Failed to upload promotion.");
    }

    setPromoMessage("Promotion uploaded successfully!");

    // Clear the form
    event.target.reset();

    setPromoTitle("");
    setPromoDescription("");
    setPromoImage(null);
    setPromoStartDate("");
    setPromoEndDate("");

  } catch (error) {
    console.error("Promotion upload error:", error);
    setPromoMessage(error.message);
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>MZE</h2>
          <span>ADMIN PANEL</span>
        </div>

        <div className="admin-menu-label">MANAGEMENT</div>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`admin-menu-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>MZE Admin</small>
            </div>
          </div>

          <button className="admin-logout">↪ Log Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Content Management</h1>
            <p>Manage the content displayed on your MZE website.</p>
          </div>

          <div className="admin-header-tag">
            <span className="admin-status-dot"></span>
            Admin Panel
          </div>
        </header>

        {/* PROMOTIONS */}
        {activeSection === "promotions" && (
          <section className="admin-content">
            <div className="admin-section-heading">
              <div>
                <h2>Promo Carousel</h2>
                <p>Upload promotional banners for your homepage carousel.</p>
              </div>
            </div>

            <form className="admin-form" onSubmit={handlePromoSubmit}>
            <div className="admin-card">
                <h3>Promotion Details</h3>

                <label>Promotion Title</label>
                <input
                type="text"
                placeholder="Enter promotion title"
                value={promoTitle}
                onChange={(e) => setPromoTitle(e.target.value)}
                required
                />

                <label>Description</label>
                <textarea
                placeholder="Enter promotion description"
                value={promoDescription}
                onChange={(e) => setPromoDescription(e.target.value)}
                />

                <label>Promotion Image</label>

                <div className="admin-upload-box">
                <span className="upload-icon">🖼️</span>
                <strong>Choose promotion image</strong>
                <p>PNG, JPG or WEBP</p>

                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleFile(e, setPromoImage)}
                    required
                />

                {promoImage && (
                    <small>Selected: {promoImage.name}</small>
                )}
                </div>

                <div className="admin-form-grid">
                <div>
                    <label>Start Date</label>
                    <input
                    type="date"
                    value={promoStartDate}
                    onChange={(e) => setPromoStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>End Date</label>
                    <input
                    type="date"
                    value={promoEndDate}
                    onChange={(e) => setPromoEndDate(e.target.value)}
                    min={promoStartDate || undefined}
                    />
                </div>
                </div>

                {promoMessage && (
                <p style={{ marginTop: "15px", color: promoMessage.includes("successfully") ? "green" : "red" }}>
                    {promoMessage}
                </p>
                )}

                <button
                type="submit"
                className="admin-submit-btn"
                disabled={isUploading}
                >
                {isUploading ? "Uploading..." : "Upload Promotion"}
                </button>
            </div>
            </form>
          </section>
        )}

        {/* PRODUCTS */}
        {activeSection === "products" && (
          <section className="admin-content">
            <div className="admin-section-heading">
              <div>
                <h2>Products</h2>
                <p>Add products and upload their images to your website.</p>
              </div>
            </div>

            <div className="admin-card">
              <h3>Product Information</h3>

              <label>Product Name</label>
              <input type="text" placeholder="e.g. iPhone 15 Pro Max" />

              <div className="admin-form-grid">
                <div>
                  <label>Category</label>
                  <select defaultValue="">
                    <option value="" disabled>Select category</option>
                    <option>Mobile Phones</option>
                    <option>Laptops</option>
                    <option>Tablets</option>
                    <option>Gaming Consoles</option>
                    <option>Smart TVs</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label>Price</label>
                  <input type="number" placeholder="Enter price" />
                </div>
              </div>

              <label>Product Description</label>
              <textarea placeholder="Enter product description"></textarea>

              <label>Product Image</label>
              <div className="admin-upload-box">
                <span className="upload-icon">📦</span>
                <strong>Choose product image</strong>
                <p>PNG, JPG or WEBP</p>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => handleFile(e, setProductImage)}
                />
                {productImage && <small>Selected: {productImage.name}</small>}
              </div>

              <button type="button" className="admin-submit-btn">
                Add Product
              </button>
            </div>
          </section>
        )}

        {/* BRANCHES */}
        {activeSection === "branches" && (
          <section className="admin-content">
            <div className="admin-section-heading">
              <div>
                <h2>Branches</h2>
                <p>Add MZE branch details and contact information.</p>
              </div>
            </div>

            <div className="admin-card">
              <h3>Branch Information</h3>

              <label>Branch Name</label>
              <input type="text" placeholder="Enter branch name" />

              <label>Complete Address</label>
              <textarea placeholder="Enter complete branch address"></textarea>

              <div className="admin-form-grid">
                <div>
                  <label>Contact Number</label>
                  <input type="tel" placeholder="09XX XXX XXXX" />
                </div>
                <div>
                  <label>Email Address</label>
                  <input type="email" placeholder="branch@mze.com" />
                </div>
              </div>

              <label>Google Maps Link</label>
              <input type="url" placeholder="Paste Google Maps link" />

              <button type="button" className="admin-submit-btn">
                Add Branch
              </button>
            </div>
          </section>
        )}

        {/* VIDEOS */}
        {activeSection === "videos" && (
          <section className="admin-content">
            <div className="admin-section-heading">
              <div>
                <h2>Videos</h2>
                <p>Upload videos to feature on the MZE website.</p>
              </div>
            </div>

            <div className="admin-card">
              <h3>Video Information</h3>

              <label>Video Title</label>
              <input type="text" placeholder="Enter video title" />

              <label>Video Description</label>
              <textarea placeholder="Enter video description"></textarea>

              <label>Upload Video</label>
              <div className="admin-upload-box">
                <span className="upload-icon">🎬</span>
                <strong>Choose video file</strong>
                <p>MP4, WEBM or MOV</p>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={(e) => handleFile(e, setVideoFile)}
                />
                {videoFile && <small>Selected: {videoFile.name}</small>}
              </div>

              <button type="button" className="admin-submit-btn">
                Upload Video
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;