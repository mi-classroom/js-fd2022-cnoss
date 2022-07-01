document.addEventListener('DOMContentLoaded', () => {
  
  const navbar = document.querySelector('[data-js-navbar]');
  const navLinks = navbar.querySelectorAll('a');
  let lastActiveNavElement = false;
    
  navLinks.forEach(item => {
    const navItem = item.closest('li');
    navItem.addEventListener('click', (ele) => {
      const { currentTarget } = ele;
      if(lastActiveNavElement) lastActiveNavElement.dataset.state = '';
      currentTarget.dataset.state = 'active';
      lastActiveNavElement = currentTarget;
    });
    
  });

});
