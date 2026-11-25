
import { useState, useEffect } from "react";
import "../../css/Admin.css";

// Separate API addresses for promotions and branches
const API_URL = import.meta.env.VITE_API_BASE_URL;

const BRANCH_API_URL =
  import.meta.env.VITE_BRANCH_API_BASE_URL || API_URL;

const initialBranchForm = {
  name: "",
  address: "",
  contact: "",
  email: "",
  hours: "",
  closed: "",
  latitude: "",
  longitude: "",
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("promotions");

  // =====================================
  // PROMOTION STATES
  // =====================================

  const [promotions, setPromotions] = useState([]);
  const [isLoadingPromotions, setIsLoadingPromotions] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [promoImage, setPromoImage] = useState(null);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoDescription, setPromoDescription] = useState("");
  const [promoStartDate, setPromoStartDate] = useState("");
  const [promoEndDate, setPromoEndDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  // =====================================
  // BRANCH STATES
  // =====================================

  const [branches, setBranches] = useState([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [isSavingBranch, setIsSavingBranch] = useState(false);
  const [branchMessage, setBranchMessage] = useState("");
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [deletingBranchId, setDeletingBranchId] = useState(null);

  const [branchForm, setBranchForm] = useState(initialBranchForm);

  // =====================================
  // OTHER FILE STATES
  // =====================================

  const [productImage, setProductImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const menuItems = [
    { id: "promotions", label: "Promo Carousel", icon: "🖼️" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "branches", label: "Branches", icon: "📍" },
    { id: "videos", label: "Videos", icon: "🎬" },
  ];

  // =====================================
  // HANDLE FILE SELECTION
  // =====================================

  const handleFile = (event, setter) => {
    const file = event.target.files[0];

    if (file) {
      setter(file);
    }
  };

  // =====================================
  // FETCH PROMOTIONS
  // =====================================

  const fetchPromotions = async () => {
    setIsLoadingPromotions(true);

    try {
      const response = await fetch(
        `${API_URL}/api/admin/promotions`,
        {
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load promotions.");
      }

      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error("Fetch promotions error:", error);
      setPromoMessage(error.message);
    } finally {
      setIsLoadingPromotions(false);
    }
  };

  // =====================================
  // FETCH BRANCHES
  // =====================================

  const fetchBranches = async () => {
    setIsLoadingBranches(true);

    try {
      const response = await fetch(
        `${BRANCH_API_URL}/api/branches`,
        {
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load branches.");
      }

      setBranches(data);
    } catch (error) {
      console.error("Fetch branches error:", error);
      setBranchMessage(error.message);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  // =====================================
  // LOAD DATA WHEN DASHBOARD OPENS
  // =====================================

  useEffect(() => {
    fetchPromotions();
    fetchBranches();
  }, []);

  // =====================================
  // DELETE PROMOTION
  // =====================================

  const handleDeletePromotion = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this promotion?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setPromoMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/promotions/${id}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete promotion.");
      }

      setPromoMessage("Promotion deleted successfully!");
      await fetchPromotions();
    } catch (error) {
      console.error("Delete promotion error:", error);
      setPromoMessage(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // UPLOAD PROMOTION
  // =====================================

  const handlePromoSubmit = async (event) => {
    event.preventDefault();

    if (!promoTitle || !promoImage) {
      setPromoMessage(
        "Please enter a title and select a promotion image."
      );
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
        `${API_URL}/api/admin/promotions`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const validationErrors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;

        throw new Error(
          validationErrors || "Failed to upload promotion."
        );
      }

      setPromoMessage("Promotion uploaded successfully!");

      await fetchPromotions();

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

  // =====================================
  // HANDLE BRANCH INPUTS
  // =====================================

  const handleBranchChange = (event) => {
    const { name, value } = event.target;

    setBranchForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // RESET BRANCH FORM
  // =====================================

  const resetBranchForm = () => {
    setBranchForm(initialBranchForm);
    setEditingBranchId(null);
    setBranchMessage("");
  };

  // =====================================
  // ADD OR UPDATE BRANCH
  // =====================================

  const handleBranchSubmit = async (event) => {
    event.preventDefault();

    setIsSavingBranch(true);
    setBranchMessage("");

    const branchData = {
      ...branchForm,
      latitude: Number(branchForm.latitude),
      longitude: Number(branchForm.longitude),
    };

    const isEditing = editingBranchId !== null;

    const url = isEditing
      ? `${BRANCH_API_URL}/api/admin/branches/${editingBranchId}`
      : `${BRANCH_API_URL}/api/admin/branches`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(branchData),
      });

      const data = await response.json();

      if (!response.ok) {
        const validationErrors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;

        throw new Error(
          validationErrors || "Failed to save branch."
        );
      }

      setBranchMessage(
        isEditing
          ? "Branch updated successfully!"
          : "Branch added successfully!"
      );

      resetBranchForm();
      await fetchBranches();
    } catch (error) {
      console.error("Save branch error:", error);
      setBranchMessage(error.message);
    } finally {
      setIsSavingBranch(false);
    }
  };

  // =====================================
  // EDIT BRANCH
  // =====================================

  const handleEditBranch = (branch) => {
    setEditingBranchId(branch.id);

    setBranchForm({
      name: branch.name || "",
      address: branch.address || "",
      contact: branch.contact || "",
      email: branch.email || "",
      hours: branch.hours || "",
      closed: branch.closed || "",
      latitude: String(branch.latitude ?? ""),
      longitude: String(branch.longitude ?? ""),
    });

    setBranchMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // DELETE BRANCH
  // =====================================

  const handleDeleteBranch = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmed) return;

    setDeletingBranchId(id);
    setBranchMessage("");

    try {
      const response = await fetch(
        `${BRANCH_API_URL}/api/admin/branches/${id}`,
        {
          method: "DELETE",
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete branch.");
      }

      if (editingBranchId === id) {
        resetBranchForm();
      }

      setBranchMessage("Branch deleted successfully!");

      await fetchBranches();
    } catch (error) {
      console.error("Delete branch error:", error);
      setBranchMessage(error.message);
    } finally {
      setDeletingBranchId(null);
    }
  };

  // =====================================
  // RETURN UI
  // =====================================

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

        {/* =====================================
            PROMOTIONS
        ===================================== */}

        {activeSection === "promotions" && (
          <section className="admin-content">

            <div className="admin-section-heading">
              <div>
                <h2>Promo Carousel</h2>
                <p>
                  Upload promotional banners for your homepage carousel.
                </p>
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
                  <p
                    style={{
                      marginTop: "15px",
                      color: promoMessage.includes("successfully")
                        ? "green"
                        : "red",
                    }}
                  >
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

            {/* EXISTING PROMOTIONS */}

            <div className="admin-card" style={{ marginTop: "25px" }}>
              <h3>Existing Promotions</h3>
              <p>View and manage your uploaded promotional banners.</p>

              {isLoadingPromotions ? (
                <p>Loading promotions...</p>
              ) : promotions.length === 0 ? (
                <p>No promotions available.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {promotions.map((promo) => (
                    <div
                      key={promo.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "12px",
                      }}
                    >
                      <img
                        src={promo.image_url}
                        alt={promo.title}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          background: "#f5f5f5",
                        }}
                      />

                      <h4 style={{ marginTop: "12px" }}>
                        {promo.title}
                      </h4>

                      <p>{promo.description}</p>

                      <small>ID: {promo.id}</small>

                      <p>
                        Status:{" "}
                        {Number(promo.is_active) === 1
                          ? "Active"
                          : "Inactive"}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleDeletePromotion(promo.id)}
                        disabled={deletingId === promo.id}
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        {deletingId === promo.id
                          ? "Deleting..."
                          : "Delete Promotion"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* =====================================
            PRODUCTS
        ===================================== */}

        {activeSection === "products" && (
          <section className="admin-content">

            <div className="admin-section-heading">
              <div>
                <h2>Products</h2>
                <p>
                  Add products and upload their images to your website.
                </p>
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

                {productImage && (
                  <small>Selected: {productImage.name}</small>
                )}
              </div>

              <button type="button" className="admin-submit-btn">
                Add Product
              </button>
            </div>
          </section>
        )}

        {/* =====================================
            BRANCHES
        ===================================== */}

        {activeSection === "branches" && (
          <section className="admin-content">

            <div className="admin-section-heading">
              <div>
                <h2>Branches</h2>
                <p>
                  Add and manage MZE branch locations and contact information.
                </p>
              </div>
            </div>

            {/* BRANCH FORM */}

            <form
              className="admin-form"
              onSubmit={handleBranchSubmit}
            >
              <div className="admin-card">

                <h3>
                  {editingBranchId
                    ? "Edit Branch Information"
                    : "Branch Information"}
                </h3>

                <label>Branch Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Kamuning Branch"
                  value={branchForm.name}
                  onChange={handleBranchChange}
                  required
                />

                <label>Complete Address</label>
                <textarea
                  name="address"
                  placeholder="Enter complete branch address"
                  value={branchForm.address}
                  onChange={handleBranchChange}
                  required
                />

                <div className="admin-form-grid">
                  <div>
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="09XX XXX XXXX"
                      value={branchForm.contact}
                      onChange={handleBranchChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="branch@mze.com"
                      value={branchForm.email}
                      onChange={handleBranchChange}
                    />
                  </div>
                </div>

                <label>Operating Hours</label>
                <input
                  type="text"
                  name="hours"
                  placeholder="Monday–Saturday: 8:00 AM – 5:45 PM"
                  value={branchForm.hours}
                  onChange={handleBranchChange}
                />

                <label>Closed Schedule</label>
                <input
                  type="text"
                  name="closed"
                  placeholder="Sunday & Holidays: Closed"
                  value={branchForm.closed}
                  onChange={handleBranchChange}
                />

                <h3 style={{ marginTop: "25px" }}>
                  Branch Map Coordinates
                </h3>

                <p>
                  Enter the latitude and longitude of your branch location.
                </p>

                <div className="admin-form-grid">
                  <div>
                    <label>Latitude</label>
                    <input
                      type="number"
                      name="latitude"
                      placeholder="e.g. 14.6263349"
                      step="any"
                      min="-90"
                      max="90"
                      value={branchForm.latitude}
                      onChange={handleBranchChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Longitude</label>
                    <input
                      type="number"
                      name="longitude"
                      placeholder="e.g. 121.0373555"
                      step="any"
                      min="-180"
                      max="180"
                      value={branchForm.longitude}
                      onChange={handleBranchChange}
                      required
                    />
                  </div>
                </div>

                {branchMessage && (
                  <p
                    style={{
                      marginTop: "15px",
                      color: branchMessage.includes("successfully")
                        ? "green"
                        : "red",
                    }}
                  >
                    {branchMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="admin-submit-btn"
                  disabled={isSavingBranch}
                >
                  {isSavingBranch
                    ? "Saving..."
                    : editingBranchId
                    ? "Update Branch"
                    : "Add Branch"}
                </button>

                {editingBranchId && (
                  <button
                    type="button"
                    onClick={resetBranchForm}
                    style={{
                      marginLeft: "10px",
                      padding: "12px 18px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Edit
                  </button>
                )}

              </div>
            </form>

            {/* EXISTING BRANCHES */}

            <div className="admin-card" style={{ marginTop: "25px" }}>

              <h3>Existing Branches</h3>

              <p>View and manage your registered MZE branches.</p>

              {isLoadingBranches ? (
                <p>Loading branches...</p>
              ) : branches.length === 0 ? (
                <p>No branches available. Add your first branch above.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "16px",
                      }}
                    >
                      <h3>{branch.name}</h3>

                      <p>
                        <strong>Address:</strong>
                        <br />
                        {branch.address}
                      </p>

                      <p>
                        <strong>Contact:</strong>
                        <br />
                        {branch.contact}
                      </p>

                      {branch.email && (
                        <p>
                          <strong>Email:</strong>
                          <br />
                          {branch.email}
                        </p>
                      )}

                      {branch.hours && (
                        <p>
                          <strong>Operating Hours:</strong>
                          <br />
                          {branch.hours}
                        </p>
                      )}

                      {branch.closed && (
                        <p>
                          <strong>Closed:</strong>
                          <br />
                          {branch.closed}
                        </p>
                      )}

                      <p>
                        <strong>Coordinates:</strong>
                        <br />
                        {branch.latitude}, {branch.longitude}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "15px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleEditBranch(branch)}
                          style={{
                            flex: 1,
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBranch(branch.id)}
                          disabled={deletingBranchId === branch.id}
                          style={{
                            flex: 1,
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {deletingBranchId === branch.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </section>
        )}

        {/* =====================================
            VIDEOS
        ===================================== */}

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

                {videoFile && (
                  <small>Selected: {videoFile.name}</small>
                )}
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
