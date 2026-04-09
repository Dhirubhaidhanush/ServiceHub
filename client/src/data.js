import companiesData from './companies.json';

// Ensure all items have a unique ID
export const MOCK_COMPANIES = companiesData.map((company, index) => ({
  ...company,
  id: String(index + 1)
}));

export const api = {

  // ✅ NEW: Get companies by STATE
  getCompaniesByState: async (state) => {
    return new Promise((resolve) => {
      setTimeout(() => {

        // If no state selected → return all
        if (!state) {
          resolve(MOCK_COMPANIES.slice(0, 100));
          return;
        }

        const results = MOCK_COMPANIES.filter((c) =>
          c.state?.toLowerCase().includes(state.toLowerCase())
        );

        resolve(results.slice(0, 100));
      }, 300);
    });
  },

  // 🔍 Search inside selected STATE
  searchCompanies: async (query, state) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();

        const results = MOCK_COMPANIES.filter((c) => {

          const matchState = state
            ? c.state?.toLowerCase().includes(state.toLowerCase())
            : true;

          const matchTitle = c.title?.toLowerCase().includes(q);

          const matchCategory = c.categories?.some((cat) =>
            cat.toLowerCase().includes(q)
          );

          return matchState && (matchTitle || matchCategory);
        });

        resolve(results.slice(0, 100));
      }, 300);
    });
  },

  // Get single company
  getCompany: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_COMPANIES.find((c) => c.id === id));
      }, 300);
    });
  }
};