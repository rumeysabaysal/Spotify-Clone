//1.element vs gibi yapılar oluşturmak yerine class özelliğini kullanıyorum. 
export class UI{
    //Kurucu metot->çekmek istediğim elemanlar için yazıyorum.
    constructor() {
        this.form = document.querySelector("form");
        this.list = document.querySelector(".list");
        this.title = document.querySelector("#title");
        this.player = document.querySelector(".player");
      }

 // Yazıları düzenleyen fonksiyon
 sliceText(text) {
  // Eğer text'in uzunluğu 15'den büyükse, 15 karakteri alarak sonuna '...' ekleyin. Bu, yazının kısa olmasını sağlar. 15 karakterin altında kalan kısmı göstermeyecek ve okunabilir hale getirecektir.
  if (text.length > 15) {
    return text.slice(0, 15) + "...";
  }
  return text;
}

    //şarkı verilerini render eden bir fonksiyon yaz.
    //renderCards isimli fonksiyon dışarıdan bir şarkı alsın
    renderCards(songs) {
        //!Listeye yeni şarkı yüklemeden önce verileri sıfırlamak için
        this.list.innerHTML = "";
        //şarkıyı dönsün foreach ile..
        songs.forEach((song) => {
          // console.log(song);
          // bir tane Div oluştursun ve bu elemanı card değişkenine aktarıyorum:
          const card = document.createElement("div");
          // Oluşturulan bu elemana 'card' classı ekle:
          card.className = "card";
    
          // !Card elemanına şarkı ile ilgili değerleri atamak için:
          card.dataset.title = song.title;
          card.dataset.subtitle = song.subtitle;
          card.dataset.img = song.images.coverarthq;
          card.dataset.mp3 = song.hub.actions[1].uri;
    
    
             // Card'ın Html'ini belirle
             card.innerHTML = `<figure>
            
             <img
               src="${song.images.coverarthq}"
               alt=""
             />
           
             <div class="play">
               <i class="bi bi-play-fill"></i>
             </div>
           </figure>
         
           <div class="card-info">
             <h4>${this.sliceText(song.title)}</h4>
             <h4>${song.subtitle}</h4>
           </div>`;

// Oluşturulan bu Html'i arayüze aktar
this.list.appendChild(card);
// Class ve obje yapıları içerisindeki bir değişkene bu yapılar içerisinde bulunan bir metotla erişmek istersek bunların başına `this` keywordu koymamız gerekir.Bunun sebebi class ve obje yapılarının bu değerin kendi içerisinde olduğunu anlamasıdır
        });
      }

       // Loader render eden fonksiyon (UİVERSE'den aldım)
       renderLoader() {
        this.list.innerHTML = `
    <div class="loader">
      <div class="cell d-0"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
    
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
      
      
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
      
      
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
      
    </div>`;
      }
    
  
   // Title'ı güncelleyen fonksiyon
   updateTitle(text) {
    this.title.textContent = text;
  }
  // Animasyon ayarlaması yapan fonksiyon


  toggleAnimation() {
    // console.log(this.player.querySelector(".info img"));

    // Player içerisindeki resime erişmek için:
    const image = document.querySelector(".info img");

    // Resime class ekle-çıkar

    image.classList.toggle("animate");
  }

  // Player kısmını dinamik şekilde renderlayacak fonksiyonumuz:
  renderPlayer(song) {
    // console.log(song);

    this.player.innerHTML = `
    <div class="info">
        <img
          src="${song.img}"
          alt=""
        />
        <div>
          <h5>${song.title}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>

      <audio
        src="${song.mp3}"
        controls
        autoplay
      ></audio>

      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;

    // Şarkı oynatılıyorsa image'e bir animasyon ekle || durdurulursa bunu kaldırmak için:

    // i-) Audio elemanına erişmek için:
    // console.log(this.player.querySelector("audio"));
    const audio = this.player.querySelector("audio");

    // ii-) Audio elemanının oyantılam && durdurulma olaylarını izlemek için:
    audio.addEventListener("play", this.toggleAnimation);
    // console.log(`Şarkı Oynatılyor..`);

    audio.addEventListener("pause", this.toggleAnimation);
    // console.log(`Şarkı durduruluyor..`);

    //  this.toggleAnimation();
  }

}