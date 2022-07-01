/* Functions 
############################################################################ */
const navInteraction = () => {
  const navbar = document.querySelector('[data-js-navbar]');
  const navLinks = navbar.querySelectorAll('a');
    
  navLinks.forEach(item => {
    const navItem = item.closest('li');
    navItem.addEventListener('click', (ele) => {
      const { currentTarget } = ele;
      changeStateOfNavItem(currentTarget);
    });
  });
}

let lastActiveNavElement = false;

const changeStateOfNavItem = (target) => {
  if(lastActiveNavElement) lastActiveNavElement.dataset.state = '';
  target.dataset.state = 'active';
  lastActiveNavElement = target;
}

const scrollSpy = () => {
  const intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio <= 0) return;
    const { target } = entries[0];
    const { id } = target;
    
    const navLink = document.querySelector(`a[href*=${id}]`);
    const navItem = navLink.closest('li');
    changeStateOfNavItem(navItem);
  });

  const elementsWithId = document.querySelectorAll('main > [id]');
  elementsWithId.forEach( ele => intersectionObserver.observe(ele));
}


/* Main 
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  navInteraction();
  scrollSpy();
});
