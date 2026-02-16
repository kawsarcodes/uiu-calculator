class globalNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="navbar">
        <a href="/index.html" style="text-decoration:none;">
          <button>
            <i class="fa-solid fa-home"></i>
            <span>Home</span>
          </button>
        </a>
        <a href="/calculator/cgpa/index.html" style="text-decoration:none;">
          <button>
            <i class="fa-solid fa-graduation-cap"></i>
            <span>CGPA</span>
          </button>
        </a>
        
        <a href="/calculator/cgpa-planner/index.html" style="text-decoration:none;">
          <button>
            <i class="fa-solid fa-bullseye"></i>
            <span>Planner</span>
          </button>
        </a>
        
        <a href="/calculator/tuitionfee/index.html" style="text-decoration:none;">
          <button>
            <i class="fa-solid fa-coins"></i>
            <span>Tuition Fee</span>
          </button>
        </a>
        <button id="shareButton">    
            <i class="fas fa-share-alt"></i><span>Share</span>
        </button>
      </div>

      <div class="overlay" id="overlay"></div>
      
      <div class="modal-share" id="shareModal">
          <button class="close" id="closeModal">&times;</button>
          <h2 class="grad-txt" style="text-align: left!important">Share</h2>
          <div class="share-buttons">
              <a href="#" id="facebookShare" target="_blank"><i class="fab fa-facebook"></i>Facebook</a>
              <a href="#" id="messengerShare" target="_blank"><i class="fab fa-facebook-messenger"></i>Messenger</a>
              <a href="#" id="instagramShare" target="_blank"><i class="fab fa-instagram"></i>Instagram</a>
              <a href="#" id="twitterShare" target="_blank"><i class="fab fa-twitter"></i>Twitter</a>
              <a href="#" id="linkedinShare" target="_blank"><i class="fab fa-linkedin"></i>LinkedIn</a>
              <a href="#" id="redditShare" target="_blank"><i class="fab fa-reddit"></i>Reddit</a>
              <a href="#" id="pinterestShare" target="_blank"><i class="fab fa-pinterest"></i>Pinterest</a>
              <a href="#" id="discordShare" target="_blank"><i class="fab fa-discord"></i>Discord</a>
              <a href="#" id="telegramShare" target="_blank"><i class="fab fa-telegram"></i>Telegram</a>
              <a href="#" id="whatsappShare" target="_blank"><i class="fab fa-whatsapp"></i>WhatsApp</a>
              <a href="#" id="viberShare" target="_blank"><i class="fab fa-viber"></i>Viber</a>
              <a href="#" id="tumblrShare" target="_blank"><i class="fab fa-tumblr"></i>Tumblr</a>
              <a href="#" id="emailShare" target="_blank"><i class="fas fa-envelope"></i>Email</a>
          </div>
          <div class="copy-link">
              <input type="text" id="shareLink" readonly>
              <!-- UPDATED BUTTON WITH ICON -->
              <button id="copyButton">
                <i class="fa-regular fa-copy"></i>
              </button>
          </div>
      </div>
    `;

    const shareButton = this.querySelector("#shareButton");
    const shareModal = this.querySelector("#shareModal");
    const overlay = this.querySelector("#overlay");
    const closeModal = this.querySelector("#closeModal");
    const copyButton = this.querySelector("#copyButton");
    const shareLink = this.querySelector("#shareLink");

    // 3. Generate Links
    const currentPageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentPageUrl);
    const encodedTitle = encodeURIComponent(document.title);

    shareLink.value = currentPageUrl;

    const setHref = (id, url) => {
      const el = this.querySelector(id);
      if (el) el.setAttribute("href", url);
    };

  
    setHref(
      "#facebookShare",
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    );

    setHref("#messengerShare", `fb-messenger://share/?link=${encodedUrl}`);

    setHref(
      "#twitterShare",
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    );

    setHref(
      "#linkedinShare",
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    );

    setHref(
      "#redditShare",
      `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    );

    setHref(
      "#pinterestShare",
      `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    );

    setHref("#whatsappShare", `https://wa.me/?text=${encodedUrl}`);

    setHref(
      "#telegramShare",
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    );

    setHref(
      "#tumblrShare",
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedTitle}`,
    );

    setHref("#viberShare", `viber://forward?text=${encodedUrl}`);

    setHref(
      "#emailShare",
      `mailto:?subject=${encodedTitle}&body=Check%20this%20out:%20${encodedUrl}`,
    );


    shareButton.addEventListener("click", () => {
      shareModal.style.display = "block";
      overlay.style.display = "block";
    });

    const closeShare = () => {
      shareModal.style.display = "none";
      overlay.style.display = "none";
    };

    closeModal.addEventListener("click", closeShare);
    overlay.addEventListener("click", closeShare);

    copyButton.addEventListener("click", () => {
      shareLink.select();
      shareLink.setSelectionRange(0, 99999); 

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareLink.value);
      } else {
        document.execCommand("copy");
      }

      const originalContent = copyButton.innerHTML;

      copyButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
      copyButton.style.backgroundColor = "#4caf50"; 
      copyButton.style.color = "#fff";

    
      setTimeout(() => {
        copyButton.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        copyButton.style.backgroundColor = ""; 
        copyButton.style.color = "";
      }, 2000);
    });

    const reloadBtn = document.getElementById("reloadButton");
    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => location.reload());
    }
  }
}

customElements.define("nav-x", globalNav);
