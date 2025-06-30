import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import LinkCard from "./LinkCard";
import Modal from "./Modal";
import FloatingIcon from "./FloatingIcon";
import TrashView from "./TrashView";
import TrashButtons from "./TrashButtons";
import { BASE_URL } from "../utilis";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [trashedLinks, setTrashedLinks] = useState([]);
  const [showTrash, setShowTrash] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    url: "",
    description: "",
    category_id: "",
    newCategoryName: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      navigate("/");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    fetchCategories();

    const storedTrashedLinks =
      JSON.parse(localStorage.getItem("trashedLinks")) || [];
    const now = Date.now();
    const freshTrash = storedTrashedLinks.filter(
      (link) =>
        now - new Date(link.deletedAt).getTime() < 30 * 24 * 60 * 60 * 1000
    );
    const expiredTrash = storedTrashedLinks.filter(
      (link) =>
        now - new Date(link.deletedAt).getTime() >= 30 * 24 * 60 * 60 * 1000
    );

    expiredTrash.forEach(async (link) => {
      await axios.delete(`${BASE_URL}/links/${link.id}`);
    });

    setTrashedLinks(freshTrash);
    localStorage.setItem("trashedLinks", JSON.stringify(freshTrash));

    fetchLinks(freshTrash.map((l) => l.id));
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL}/categories`);
    setCategories(res.data);
  };

  const fetchLinks = async (trashedIds = []) => {
    const res = await axios.get(`${BASE_URL}/links`);
    const activeLinks = res.data.filter(
      (link) => !trashedIds.includes(link.id)
    );
    setLinks(activeLinks);
    setFilteredLinks(activeLinks);
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      const linksToTrash = links.filter(
        (link) => link.category_id === categoryId
      );
      const updatedTrash = [
        ...trashedLinks,
        ...linksToTrash.map((link) => ({
          ...link,
          deletedAt: new Date().toISOString(),
        })),
      ];

      setTrashedLinks(updatedTrash);
      localStorage.setItem("trashedLinks", JSON.stringify(updatedTrash));

      const updatedLinks = links.filter(
        (link) => link.category_id !== categoryId
      );
      setLinks(updatedLinks);

      await axios.delete(`${BASE_URL}/categories/${categoryId}`);

      await fetchCategories();

      if (activeCategory === categoryId) {
        setActiveCategory("All");
        setFilteredLinks(updatedLinks);
      } else if (activeCategory === "All") {
        setFilteredLinks(updatedLinks);
      } else {
        setFilteredLinks(
          updatedLinks.filter((link) => link.category_id === activeCategory)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalCategoryId = formData.category_id;

    if (!formData.category_id && formData.newCategoryName) {
      const res = await axios.post(`${BASE_URL}/categories`, {
        name: formData.newCategoryName,
      });
      finalCategoryId = res.data.id;
      await fetchCategories();
    }

    const payload = {
      title: formData.title,
      url: formData.url,
      description: formData.description,
      category_id: finalCategoryId,
    };

    if (isEdit) {
      await axios.patch(`${BASE_URL}/links/${formData.id}`, payload);
    } else {
      await axios.post(`${BASE_URL}/links`, payload);
    }

    setFormData({
      id: null,
      title: "",
      url: "",
      description: "",
      category_id: "",
      newCategoryName: "",
    });

    setShowModal(false);
    setIsEdit(false);
    const storedTrashedLinks =
      JSON.parse(localStorage.getItem("trashedLinks")) || [];
    fetchLinks(storedTrashedLinks.map((l) => l.id));
  };

  const handleDelete = async (id) => {
    const linkToDelete = links.find((link) => link.id === id);
    const updatedTrash = [
      ...trashedLinks,
      { ...linkToDelete, deletedAt: new Date().toISOString() },
    ];
    localStorage.setItem("trashedLinks", JSON.stringify(updatedTrash));
    setTrashedLinks(updatedTrash);
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    setFilteredLinks(
      updatedLinks.filter(
        (link) =>
          activeCategory === "All" || link.category_id === activeCategory
      )
    );
  };

  const handleEdit = (link) => {
    setFormData({ ...link, newCategoryName: "" });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleCategoryFilter = (catId) => {
    setActiveCategory(catId);
    setShowTrash(false);
    if (catId === "All") {
      setFilteredLinks(links);
    } else {
      setFilteredLinks(links.filter((link) => link.category_id === catId));
    }
  };

  const getLinkCount = (categoryId) =>
    links.filter((link) => link.category_id === categoryId).length;

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  const handleLogout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleRestore = async (id) => {
    const link = trashedLinks.find((l) => l.id === id);
    if (!link) return;

    const updatedLinks = [...links, link];
    setLinks(updatedLinks);
    if (activeCategory === "All" || activeCategory === link.category_id) {
      setFilteredLinks([...filteredLinks, link]);
    }

    const updatedTrash = trashedLinks.filter((l) => l.id !== id);
    setTrashedLinks(updatedTrash);
    localStorage.setItem("trashedLinks", JSON.stringify(updatedTrash));
  };

  const handlePermanentDelete = async (id) => {
    const updatedTrash = trashedLinks.filter((link) => link.id !== id);
    setTrashedLinks(updatedTrash);
    localStorage.setItem("trashedLinks", JSON.stringify(updatedTrash));
    await axios.delete(`${BASE_URL}/links/${id}`);
  };

  const handleRestoreAll = () => {
    const updatedLinks = [...links, ...trashedLinks];
    setLinks(updatedLinks);

    if (activeCategory === "All") {
      setFilteredLinks(updatedLinks);
    }

    setTrashedLinks([]);
    localStorage.setItem("trashedLinks", JSON.stringify([]));
  };

  const handleEmptyTrash = async () => {
    for (let link of trashedLinks) {
      if (!link?.id) {
        console.warn("Skipping invalid trashed link:", link);
        continue;
      }

      try {
        await axios.delete(`${BASE_URL}/links/${link.id}`);
      } catch (err) {
        console.error(
          `Failed to delete link with id ${link.id}:`,
          err.response?.status || err.message
        );
      }
    }

    setTrashedLinks([]);
    localStorage.setItem("trashedLinks", JSON.stringify([]));
  };

  const handleTrashButtonClick = () => {
    setShowTrash(true);
    setActiveCategory("");
  };

  return (
    <div className="min-h-screen bg-sky-400 flex flex-col">
      <Header handleLogout={handleLogout} />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          categories={categories}
          links={links}
          activeCategory={activeCategory}
          expandSidebar={expandSidebar}
          setExpandSidebar={setExpandSidebar}
          handleCategoryFilter={handleCategoryFilter}
          getLinkCount={getLinkCount}
          trashedLinks={trashedLinks}
          showTrash={showTrash}
          setShowTrash={setShowTrash}
          handleCategoryDelete={handleCategoryDelete}
          TrashButton={
            <TrashButtons
              trashedLinksCount={trashedLinks.length}
              isActive={showTrash}
              onClick={handleTrashButtonClick}
            />
          }
        />

        <main className="flex-1 p-4 sm:p-6 relative">
          <SearchBar
            links={links}
            setFilteredLinks={setFilteredLinks}
            activeCategory={activeCategory}
            getCategoryName={getCategoryName}
          />

          {showTrash ? (
            <TrashView
              trashedLinks={trashedLinks}
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDelete}
              onRestoreAll={handleRestoreAll}
              onEmptyTrash={handleEmptyTrash}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  getCategoryName={getCategoryName}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}

          <FloatingIcon
            setShowModal={setShowModal}
            setIsEdit={setIsEdit}
            setFormData={setFormData}
          />

          <Modal
            showModal={showModal}
            isEdit={isEdit}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            handleSubmit={handleSubmit}
            setShowModal={setShowModal}
          />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
