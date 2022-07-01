/* eslint-disable max-classes-per-file */
/* Classes
############################################################################ */
class NavInteraction {
  constructor(ele) {
    this.navBar = ele;
    this.navLinks = this.navBar.querySelectorAll('a');
    this.lastActiveNavElement = false;
  }

  addInteraction() {
    this.navLinks.forEach((item) => {
      const navItem = item.closest('li');
      navItem.addEventListener('click', (ele) => {
        const { currentTarget } = ele;
        this.changeStateOfNavItem(currentTarget);
      });
    });
  }

  changeStateOfNavItem(element) {
    const target = element;
    if (this.lastActiveNavElement) this.lastActiveNavElement.dataset.state = '';
    target.dataset.state = 'active';
    this.lastActiveNavElement = target;
  }
}

class Comments {
  constructor(pattern) {
    this.templateUrl = '/templates/comment.html';
    this.target = document.querySelector(pattern);
    this.commentUrl = this.target.dataset.jsComments;
  }

  render() {
    fetch(this.templateUrl)
      .then((response) => response.text())
      .then((template) => this.fetchComments(template));
  }

  fetchComments(template) {
    fetch(this.commentUrl)
      .then((response) => response.json())
      .then((commentsData) => {
        // eslint-disable-next-line no-undef
        this.target.innerHTML = Mustache.render(template, commentsData);
      });
  }
}

/* Functions
############################################################################ */

const scrollSpy = (navInteraction) => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    const { target } = entries[0];
    const { id } = target;

    const navLink = document.querySelector(`a[href*=${id}]`);
    const navItem = navLink.closest('li');
    navInteraction.changeStateOfNavItem(navItem);
  });

  const elementsWithId = document.querySelectorAll('main > [id]');
  elementsWithId.forEach((ele) => intersectionObserver.observe(ele));
};

const vueComments = () => {
  // eslint-disable-next-line no-undef
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        jsonUrl: '/json/comments.json',
        message: 'Hello Vue!',
        comments: [],
      };
    },
    methods: {
      fetchData(jsonUrl) {
        fetch(jsonUrl)
          .then((response) => response.json())
          .then((data) => {
            this.comments = data;
          });
      },
      imageUrl(filename) {
        return `/images/avatars/${filename}`;
      },
    },
    mounted() {
      this.fetchData(this.jsonUrl);
    },

  }).mount('#vue-comments');
};

/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navInteraction = new NavInteraction(navbar);
  navInteraction.addInteraction();

  scrollSpy(navInteraction);

  const comments = new Comments('[data-js-comments]');
  comments.render();

  vueComments();
});
