import { useState, useEffect } from "react";
import { Search, MapPin, Building, X, Star, Phone, Send } from "lucide-react";
import { api } from "../data";

// ⭐ Star Rating
function StarRating({ score }) {
  if (!score) return null;

  const fullStars = Math.round(score);
  const starsText = `${score} star${score !== 1 ? 's' : ''}`;

  return (
    <div className="flex items-center gap-1.5 bg-white text-[#005461] px-3 py-1.5 rounded-lg shrink-0">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#005461] text-[#005461]" />
        ))}
      </div>
      <span className="text-xs font-bold whitespace-nowrap">{starsText}</span>
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedState, setSelectedState] = useState("");

  // 🔄 Fetch
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        let data;

        if (searchQuery.trim()) {
          data = await api.searchCompanies(searchQuery, selectedState);
        } else {
          data = await api.getCompaniesByState(selectedState);
        }

        setCompanies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCompanies, 300);
    return () => clearTimeout(timer);

  }, [searchQuery, selectedState]);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  // ESC close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCompany(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* NAVBAR */}
      <nav className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#005461] rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#005461] font-display tracking-tight">
            ServiceHub
          </span>
        </div>

        {/* STATE DROPDOWN */}
        <div className="relative">

          {/* ✅ Desktop Button (UNCHANGED) */}
          <div className="hidden sm:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="appearance-none bg-white border cursor-pointer border-[#005461] text-[#005461] px-4 py-2.5 rounded-full flex items-center gap-2"
            >
              <span>{selectedState || "Select State"}</span>

              {/* Arrow */}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* ✅ Mobile Menu Icon */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* ✅ SAME DROPDOWN (NO CHANGES) */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">

              <div onClick={() => { setSelectedState("Tamil Nadu"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Tamil Nadu
              </div>

              <div onClick={() => { setSelectedState("Karnataka"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Karnataka
              </div>

              <div onClick={() => { setSelectedState("Maharashtra"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Maharashtra
              </div>

              <div onClick={() => { setSelectedState("Telangana"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Telangana
              </div>

              <div onClick={() => { setSelectedState("Kerala"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Kerala
              </div>

              <div onClick={() => { setSelectedState("Sikkim"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Sikkim
              </div>

              <div onClick={() => { setSelectedState("Goa"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Goa
              </div>

              <div onClick={() => { setSelectedState("Delhi"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Delhi
              </div>

              <div onClick={() => { setSelectedState("Rajasthan"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Rajasthan
              </div>

              <div onClick={() => { setSelectedState("Gujarat"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Gujarat
              </div>

              <div onClick={() => { setSelectedState("Chhattisgarh"); setIsOpen(false); }} className="px-4 py-2 hover:bg-green-50 cursor-pointer">
                Chhattisgarh
              </div>

            </div>
          )}
        </div>
      </nav>

      {/* HEADER */}
      <div className="pt-16 px-8 pb-12 text-center max-w-3xl mx-auto flex flex-col items-center w-full">

        <h1 className="text-5xl md:text-[3.5rem] font-extrabold text-[#111827] mb-6">
          Discover Reliable <span className="text-[#005461]">Tech Service Providers</span>
          <br />
          in {selectedState || "Your State"}
        </h1>

        <div className="w-full max-w-2xl relative rounded-full bg-white p-2 flex items-center border border-gray-100 shadow-sm">
          <Search className="ml-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search company name"
            className="flex-1 bg-transparent outline-none px-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* RESULTS */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pb-20">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {searchQuery ? `Search Results (${filteredCompanies.length})` : "All Companies"}
          </h2>
          <div className="text-sm text-gray-500">
            Showing top {filteredCompanies.length} results
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#005461]">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredCompanies.map(company => (
              <div
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="bg-[#F9FAFB] border border-gray-200 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                <div className="flex flex-col gap-5">

                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {company.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#005461] text-sm font-medium">
                    <Building className="w-4 h-4" />
                    <span>{company.categories?.[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <StarRating score={company.totalScore} />
                    <span className="text-gray-400 text-sm">
                      ({company.reviewsCount || 0})
                    </span>
                  </div>

                  <span className="bg-green-100 text-[#005461] text-sm px-4 py-1 rounded-full w-fit">
                    {company.categories?.[0]}
                  </span>
                </div>

                <div className="mt-auto pt-6">
                  <div className="border-t border-gray-200 mb-4"></div>

                  <div className="flex gap-4">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-[#005461] text-white py-3 rounded-lg text-center"
                      >
                        Website
                      </a>
                    )}

                    {company.url && (
                      <a
                        href={company.url}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-center flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedCompany(null)}
          ></div>

          <div className="relative bg-white rounded-[24px] w-full max-w-lg shadow-2xl">

            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"
            >
              <X />
            </button>

            <div className="p-8">

              <h2 className="text-2xl font-bold text-[#005461] mb-4">
                {selectedCompany.title}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <StarRating score={selectedCompany.totalScore} />
                <span className="text-gray-500">
                  ({selectedCompany.reviewsCount})
                </span>
              </div>

              <div className="flex items-start gap-2 text-gray-600 mb-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>
                  {selectedCompany.street}, {selectedCompany.city}, {selectedCompany.state}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <Phone className="w-5 h-5" />
                <span>{selectedCompany.phone || "N/A"}</span>
              </div>

              <div className="flex gap-3">
                {selectedCompany.website && (
                  <a href={selectedCompany.website} target="_blank"
                    className="flex-1 bg-[#005461] text-white py-3 rounded-xl text-center">
                    Website
                  </a>
                )}

                {selectedCompany.url && (
                  <a href={selectedCompany.url} target="_blank"
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-center flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Directions
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}