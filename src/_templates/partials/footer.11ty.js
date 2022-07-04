exports.html = `
<footer id="comments">
  <h2 class="headline">Ihr Kommentar zum Thema</h2>
    <form>
            <fieldset>
              <legend>Persönliche Daten</legend>

              <div class="field-with-label">
                <label for="vorname">Vorname</label>
                <input
                  type="text"
                  id="vorname"
                  name="vorname"
                  placeholder="Erika"
                />
              </div>

              <div class="field-with-label">
                <label for="nachname">Nachname</label>
                <input
                  type="text"
                  id="nachname"
                  name="nachname"
                  placeholder="Mustermann"
                />
              </div>

              <div class="field-with-label">
                <label for="email">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.mustermann@web.de"
                />
              </div>

              <div class="field-with-label">
                <label for="avatar">Profilbild</label>
                <input type="file" id="avatar" name="avatar" />
              </div>
            </fieldset>

            <div class="field-with-label">
              <label for="kommentar">Ihr Kommentar</label>
              <textarea id="kommentar" name="kommentar"></textarea>
            </div>

            <div class="field">
              <p>
                Soll der Autorenname in einer späteren Anzeige anonymisiert
                werden?
              </p>
              <input
                type="radio"
                id="ja"
                name="anonymisieren"
                value="ja"
                checked
              />
              <label for="ja">ja</label>

              <input type="radio" id="nein" name="anonymisieren" value="nein" />
              <label for="nein">nein</label>
            </div>

            <div class="field">
              <p>Haben Sie die Datenschutzerklärung brav gelesen?</p>
              <input type="checkbox" name="datenschutz" id="datenschutz" />
              <label for="datenschutz"
                >ja, ich habe die Datenschutzerklärung brav gelesen</label
              >
            </div>

            <div class="footer-field">
              <input type="reset" value="Daten zurücksetzen" />
              <input type="submit" value="Kommentar absenden" />
            </div>
          </form>
  <h3>Comments via Mustache</h3>
  <ul class="comment-list" data-js-comments="../assets/json/comments.json"></ul>
  <h3>Comments via Vue.js</h3>
  <ul id="vue-comments" class="comment-list" data-js-vue-comments="../assets/json/comments.json'">
    <li v-for="comment in comments.items">
      <figure class="comment">
        <img :src="imageUrl(comment.avatar)" class="comment__avatar">
        <figcaption>
          <h3 class="comment__name">{{comment.firstname}} {{comment.lastname}}</h3>
          <p class="comment__text">{{comment.comment}}</p>
          <date class="comment__date">{{comment.date}}</date>
        </figcaption>
      </figure>
    </li>
  </ul>
</footer>
`;
