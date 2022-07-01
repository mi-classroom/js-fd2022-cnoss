/* Classes 
############################################################################ */
class NavInteraction {
  constructor(ele){
    this.navBar = ele;
    this.navLinks = this.navBar.querySelectorAll('a');
    this.lastActiveNavElement = false;
  }

  addInteraction() {
    this.navLinks.forEach(item => {
      const navItem = item.closest('li');
      navItem.addEventListener('click', (ele) => {
        const { currentTarget } = ele;
        this.changeStateOfNavItem(currentTarget);
      });
    });
  }

  changeStateOfNavItem(target){
    if(this.lastActiveNavElement) this.lastActiveNavElement.dataset.state = '';
    target.dataset.state = 'active';
    this.lastActiveNavElement = target;
  }

}

/* Functions 
############################################################################ */

const scrollSpy = (navInteraction) => {
  const intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio <= 0) return;
    const { target } = entries[0];
    const { id } = target;
    
    const navLink = document.querySelector(`a[href*=${id}]`);
    const navItem = navLink.closest('li');
    navInteraction.changeStateOfNavItem(navItem);
  });

  const elementsWithId = document.querySelectorAll('main > [id]');
  elementsWithId.forEach( ele => intersectionObserver.observe(ele));
}

/* Main 
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  // navInteraction();
  const navbar = document.querySelector('.navbar');
  const navInteraction = new NavInteraction(navbar);
  navInteraction.addInteraction();
  
  scrollSpy(navInteraction);
});
