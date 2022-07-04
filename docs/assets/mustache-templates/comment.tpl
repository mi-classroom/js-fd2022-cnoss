{{#items}}
<li>
  <figure class="comment">
    <img class="comment__avatar" src="/images/avatars/{{avatar}}" alt="{{firstname}} {{lastname}}">
    <figcaption>
      <h3 class="comment__name">{{firstname}} {{lastname}}</h3>
      <p class="comment__text">{{comment}}</p>
      <date class="comment__date">{{date}}</date>
    </figcaption>
  </figure>
</li>
{{/items}}