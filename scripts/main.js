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

const fetchComments = () => {
  fetch('/json/comments.json')
  .then(response => response.json())
  .then(data => renderComments(data));
}

const renderComments = (comments) => {
  const target = document.querySelector('[data-js-comments]')
  const commentList = comments.map(comment => {
    return `
      <figure class="comment">
        <img class="comment_avatar" src="/images/avatars/${comment.avatar}" alt="${comment.firstname} ${comment.lastname}">
        <figcaption>
          <h3 class="comment__name">${comment.firstname} ${comment.lastname}</h3>
          <p class="comment__text">${comment.comment}</p>
          <date class="comment__date">${comment.date}</date>
        </figcaption>
      </figure>
    `;
  });

  target.innerHTML = commentList.join("");
}
/* Main 
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  // navInteraction();
  const navbar = document.querySelector('.navbar');
  const navInteraction = new NavInteraction(navbar);
  navInteraction.addInteraction();
  
  scrollSpy(navInteraction);
  fetchComments();
});
