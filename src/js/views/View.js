import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  /**
   * Render the received object to thr DOM
   * @param {Object | Object[]} data The data to be rendered(e.g recipe)
   * @param {boolean} [render =true] If false, create markup string instead of renderinf to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Rakesh BB
   * @todo
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkUp();
    // recipeContainer.innerHTML = '';
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🧨', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markUp = ` 
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  renderError(message = this._errorMessage) {
    const markUp = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
