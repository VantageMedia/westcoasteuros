class ProductThumbnailZoom extends HTMLElement {
  constructor() {
    super();
    this.thumbnailElement = this.querySelector(".card-media-image");
    this.zoomArea = this.querySelector(".product-thumbnail-zoom-area");
    this.spinner = this.zoomArea.querySelector(".spinner");
    this.imageSrc = this.dataset.src;
    this.imageLoaded = false;

    this.mediaQuery = window.matchMedia("(min-width: 750px)");

    if (this.mediaQuery.matches) {
      this.init();
    }

    // Listen for changes in screen size
    this.mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        this.init();
      } else {
        this.destroy();
      }
    });
  }

  init() {
    if (!this.thumbnailElement || !this.zoomArea || !this.imageSrc) {
      return;
    }

    this.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
  }

  destroy() {
    this.removeEventListener("mouseenter", this.handleMouseEnter);
  }

  handleMouseEnter() {
    if (!this.imageLoaded) {
      const img = document.createElement("img");
      img.style.display = "none";

      img.addEventListener("load", () => {
        if (this.spinner) {
          this.spinner.style.display = "none";
        }
        img.style.display = "block";
        this.imageLoaded = true;
      });

      img.src = this.imageSrc;
      this.zoomArea.appendChild(img);
    }
  }
}

customElements.define("product-thumbnail-zoom", ProductThumbnailZoom);
