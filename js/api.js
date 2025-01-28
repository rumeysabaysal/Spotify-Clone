//3.NOT:her class kullanımında constructor yazmak zorunda değiliz, o zaten arka planda çalışıyor!!
//Burada rapidapi.com'dan shazam api url'sine ulaşacak fonksiyonu oluşturuyorum. const option bu api'da eklenmesi gereken olan verilmiş.

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7a76415c4cmsh7c07df173c27eb8p1d56e8jsnd0754ec99ff1',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};


export class API{
	//popular şarkıları alan fonksiyon
async getPopular(){
//     const url = 'https://shazam.p.rapidapi.com/search?term=daft%20punk';
// //apı'ya istek at
//     const response = await fetch(url, options);

// //api'dan gelen veriyi js nesnesine çevir
//     const data = await response.json();
// 	const formattedData = data.tracks.hits.map((item)=>item.track)
// 	console.log(formattedData);

// 	return formattedData;


    //!spread operatörü ile elimizdeki değeri tutup yeni değerleri de kaydedip yeni bir data oluşturduk.
	const data = await this.searchMusic("Daft Punk");
    const data1 = await this.searchMusic("Beirut");
    const data2 = await this.searchMusic("Danit");
    console.log(data);

    // Üç noktayla yaptık!!!
    return [...data, ...data1, ...data2];
}

// Aratılan şarkı verisini alan fonksiyon

async searchMusic(query) {
    const url = `https://shazam.p.rapidapi.com/search?term=${query}`;

    // Aratılan değer ile api'a istek at
    const res = await fetch(url, options);
    // Gelen veriyi js nesnesine çevir
    const data = await res.json();

    // Veriyi projeye uygun şekilde dönüştür
    const formattedData = data.tracks.hits.map((item) => item.track);

    return formattedData;
  }
}