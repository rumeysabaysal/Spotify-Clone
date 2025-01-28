//!İmport Alanı
//2.UI Classını import et
import {UI} from "./ui.js";

//API clasını import et.(3.aşamanın devamı)
import {API} from "./api.js";

//!Örnek Alanı
//bir class yapısını doğrudan kullanmadığım için new keywordü ile bir örneğini almalıyım. Sonrasında bir değişkene atrak kullanılabilir hale getiriyorum. Burada asıl amacım ui içerisindeki formdaki bir olay izleyicisini izleyebilme.
//UI clasının örneğini al
const ui = new UI();

//API clasının örneğini al
const api = new API();

//!Sayfa işlemleri sayfa yüklendiğinde form gönderldiğinde sayfanın durumları
//A.sayfanın yüklendiği anı izle.
// document.addEventListener("DOMContentLoaded", async()=>{
//   const data = await api.getPopular();
//   console.log(data);
// })
document.addEventListener("DOMContentLoaded", async()=>{
  // Loader'ı render etmek için:
  ui.renderLoader();

  // Api'a istek at ve api'dan gelen veri ile arayüzü renderlamak için:
  api
    .getPopular()
    // .then(()=>{})
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
    });
});




//B.form gönderildiğinde bunu izle ve bir fonksiyon çalıştır.

ui.form.addEventListener("submit", (e)=>{
    //arama yaptırdığımda hemen konsoldaki yazı gidiyor. bu yüzden sayfa yenilemeyi engelliyorum
    e.preventDefault();
    // console.log("form gönderildi.");

    //form gönderildiğinde input içerisindeki değere eriş
    const query = e.target[0].value;
    // console.log(query)

    //aratılan kelimenin başındaki ve sonundaki boşlukları kaldır ve eğer query değeri yoksa uyarı ver
    // console.log(query.length);
    // console.log(query.trim().length);
    // Eğer query değeri yoksa uyarı vermeli:

  if(!query.trim()){
    //console.log(`Geçerli Bir Arama Giriniz..`);
    return alert("Lütfen geçerli bir arama işlemi gerçekleştiriniz.")
  }
  
  
 // !api.getPopular();kesip aldım yukarıya sayfa yüklenilen kısma taşıdım!
  // api.getPopular();(yukarıda)

  //....

   // Loader'ı render et etmek için:
   ui.renderLoader();

   // Title'ı güncellemek için:
 
   ui.updateTitle(query + " için sonuçlar");
  

 //aratılan kelimeyle birlikte APIya istek at sonrasında gelen veriyle ekrana cartlarırenderla.
 api.searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => alert(err));

  
});
// Liste kısmındaki play iconuna tıklayınca arayüzü bu şarkı verisine göre renderlayacak fonksiyon:

ui.list.addEventListener("click", (e) => {
  // console.log(`Tıklanıldı..`);
  // console.log(e);
  // console.log(e.target);
  //! List içerisinde tıklanılan elemanın play butonu olup olmadığını kontrol etmek için:
  if (e.target.className == "play") {
    // console.log(`Play butonuna tıklandı..`);

    //!Play butonunun kapsayıcısına erişmek için:
    // const card = e.target.parentElement(".card");(figüre çıktık)
    // const card = e.target.parentElement.parentElement(".card");(carda çıktık)-> Ama kullanışlı olsun dıye closest demek istiyoruz
    const card = e.target.closest(".card");
    // console.log(card.dataset);
    // console.log(card.dataset.title);

    //! Kapsayıcıya verilen dataset özelliklerini al(title,image,mp3)
    // const data = console.log(card.dataset);
    const data = card.dataset;

    //!Player kısmını render et:
    ui.renderPlayer(data);
  }
});