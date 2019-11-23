
  const STORAGE_KEY = 'theme-color-scheme';
  const COLOR_MODE_KEY = '--color-mode';

  const themeToggleButton = document.querySelector('.js-theme-toggle');
  const themeToggleText = document.querySelector('.js-theme-toggle-text');
  const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);
    if (response.length) {
        response = response.replace(/\'|"/g, '').trim();
    }

    return response;
  };

  const applyTheme = passedSetting => {
    let currentTheme = passedSetting || localStorage.getItem(STORAGE_KEY);
    
    if(currentTheme) {
        document.documentElement.setAttribute('data-theme-color-scheme', currentTheme);
        setButtonLabelAndStatus(currentTheme);
    } else {
      setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
    }
  }

  const toggleSetting = () => {
    let currentTheme = localStorage.getItem(STORAGE_KEY);

    switch(currentTheme) {
      case null:
      currentTheme = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
      case 'light':
      currentTheme = 'dark';
      break;
      case 'dark':
      currentTheme = 'light';
      break;
    }
    localStorage.setItem(STORAGE_KEY, currentTheme);

    return currentTheme;
  }

  const setButtonLabelAndStatus = currentTheme => { 
    themeToggleText.innerText = `Enable ${currentTheme === 'dark' ? 'light' : 'dark'} mode`;
  }

  themeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    
    applyTheme(toggleSetting());
  });
export { applyTheme }
