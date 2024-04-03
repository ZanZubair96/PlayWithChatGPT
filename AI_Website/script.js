const websites = [
    { name: "OpenAI", url: "https://openai.com" },
    { name: "Google AI", url: "https://ai.google" },
    { name: "IBM Watson", url: "https://www.ibm.com/watson" },
    { name: "Microsoft AI", url: "https://www.microsoft.com/en-us/ai" },
    // Add more websites as needed
  ];
  
  const linksContainer = document.getElementById('links-container');
  const searchInput = document.getElementById('searchInput');
  
  function renderLinks(websites) {
    linksContainer.innerHTML = '';
    websites.forEach(website => {
      const linkItem = document.createElement('div');
      linkItem.classList.add('link-item');
  
      const link = document.createElement('a');
      link.href = website.url;
      link.target = "_blank";
      link.textContent = website.name;
  
      linkItem.appendChild(link);
      linksContainer.appendChild(linkItem);
    });
  }
  
  renderLinks(websites);
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredWebsites = websites.filter(website => website.name.toLowerCase().includes(searchTerm));
    renderLinks(filteredWebsites);
  });
  