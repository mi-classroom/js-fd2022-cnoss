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

class Comments {
  constructor(pattern) {
    this.target = document.querySelector(pattern);
    this.commentUrl = this.target.dataset.jsComments;
  }

  fetch() {
    fetch(this.commentUrl)
      .then(response => response.json())
      .then(data => this.render(data));
  }

  render(data) {
    const commentList = data.map(comment => {
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

    this.target.innerHTML = commentList.join("");
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
  const navbar = document.querySelector('.navbar');
  const navInteraction = new NavInteraction(navbar);
  navInteraction.addInteraction();
  
  scrollSpy(navInteraction);

  const comments = new Comments('[data-js-comments]');
  comments.fetch();
});
