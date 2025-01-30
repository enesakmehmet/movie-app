import { useState, useMemo, useEffect } from 'react'
import { Movie } from './types/Movie'
import MovieCard from './components/MovieCard'
import MovieModal from './components/MovieModal'
import './App.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('Tümü')
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating')
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [watchlist, setWatchlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [view, setView] = useState<'all' | 'favorites' | 'watchlist'>('all');
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>(() => {
    const saved = localStorage.getItem('userRatings');
    return saved ? JSON.parse(saved) : {};
  });
  const [comments, setComments] = useState<{[key: number]: string[]}>(() => {
    const saved = localStorage.getItem('comments');
    return saved ? JSON.parse(saved) : {};
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const movies = useMemo(() => [
    {
      id: 1,
      title: "Inception",
      posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      releaseYear: 2010,
      director: "Christopher Nolan",
      plot: "Dom Cobb yetenekli bir hırsızdır. Uzmanlık alanı, zihnin en savunmasız olduğu rüya görme anında, bilinçaltının derinliklerindeki değerli sırları çekip çıkarmak ve onları çalmaktır.",
      cast: ["Leonardo DiCaprio", "Ellen Page", "Tom Hardy", "Joseph Gordon-Levitt"],
      genre: ["Bilim Kurgu", "Aksiyon", "Gerilim"],
      duration: 148,
      rating: 8.8,
      trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      releaseYear: 1994,
      director: "Frank Darabont",
      plot: "Andy Dufresne, karısını ve sevgilisini öldürmek suçundan müebbet hapse mahkum edilir ve Shawshank Hapishanesi'ne gönderilir. Burada Red ile arkadaşlık kurar ve umudunu hiç kaybetmez.",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      genre: ["Drama"],
      duration: 142,
      rating: 9.3,
      trailerUrl: "https://www.youtube.com/embed/6hB3S9bIaco"
    },
    {
      id: 3,
      title: "Pulp Fiction",
      posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      releaseYear: 1994,
      director: "Quentin Tarantino",
      plot: "Los Angeles'ın suç dünyasından iç içe geçmiş dört hikâye. Tetikçiler, bir boksör, bir gangster ve karısı, silahlı soyguncular...",
      cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
      genre: ["Suç", "Drama"],
      duration: 154,
      rating: 8.9,
      trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY"
    },
    {
      id: 4,
      title: "The Dark Knight",
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      releaseYear: 2008,
      director: "Christopher Nolan",
      plot: "Batman, Teğmen Gordon ve Savcı Harvey Dent, Gotham'ı suç örgütlerinden temizlemeye kararlıdır. Ancak işler, Joker ortaya çıkınca kontrolden çıkar.",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
      genre: ["Aksiyon", "Suç", "Drama"],
      duration: 152,
      rating: 9.0,
      trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
      id: 5,
      title: "Schindler's List",
      posterUrl: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      releaseYear: 1993,
      director: "Steven Spielberg",
      plot: "II. Dünya Savaşı sırasında Alman işadamı Oskar Schindler, işlettiği fabrikada Yahudi işçileri çalıştırarak onları Nazi toplama kamplarından kurtarır.",
      cast: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
      genre: ["Biyografi", "Drama", "Tarih"],
      duration: 195,
      rating: 9.0,
      trailerUrl: "https://www.youtube.com/embed/gG22XNhtnoY"
    },
    {
      id: 6,
      title: "The Matrix",
      posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      releaseYear: 1999,
      director: "Lana ve Lilly Wachowski",
      plot: "Bir bilgisayar programcısı, gerçek dünyanın aslında yapay bir simülasyon olduğunu keşfeder ve insanlığı kurtarmak için mücadeleye başlar.",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      genre: ["Bilim Kurgu", "Aksiyon"],
      duration: 136,
      rating: 8.7,
      trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8"
    },
    {
      id: 7,
      title: "Forrest Gump",
      posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
      releaseYear: 1994,
      director: "Robert Zemeckis",
      plot: "Düşük IQ'lu Forrest Gump'ın, Vietnam Savaşı'ndan ping pong şampiyonluğuna uzanan olağanüstü yaşam hikayesi.",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      genre: ["Drama", "Romantik"],
      duration: 142,
      rating: 8.8,
      trailerUrl: "https://www.youtube.com/embed/bLvqoHBptjg"
    },
    {
      id: 8,
      title: "Fight Club",
      posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      releaseYear: 1999,
      director: "David Fincher",
      plot: "Uykusuzluk problemi yaşayan bir ofis çalışanı, gizemli bir sabun satıcısı Tyler Durden ile tanışır ve yeraltında bir dövüş kulübü kurarlar.",
      cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
      genre: ["Drama", "Gerilim"],
      duration: 139,
      rating: 8.8,
      trailerUrl: "https://www.youtube.com/embed/qtRKdVHc-cE"
    },
    {
      id: 9,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      releaseYear: 2001,
      director: "Peter Jackson",
      plot: "Genç hobbit Frodo Baggins, Orta Dünya'yı kurtarmak için tehlikeli bir yolculuğa çıkar. Tek Yüzük'ü yok etmek için oluşturulan dostluk cemiyetiyle birlikte zorlu bir maceraya atılır.",
      cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom"],
      genre: ["Fantastik", "Macera", "Aksiyon"],
      duration: 178,
      rating: 8.8,
      trailerUrl: "https://www.youtube.com/embed/V75dMMIW2B4"
    },
    {
      id: 10,
      title: "Goodfellas",
      posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      releaseYear: 1990,
      director: "Martin Scorsese",
      plot: "Henry Hill'in mafya dünyasında yükselişini ve düşüşünü anlatan gerçek bir hikaye.",
      cast: ["Ray Liotta", "Robert De Niro", "Joe Pesci"],
      genre: ["Suç", "Drama", "Biyografi"],
      duration: 146,
      rating: 8.7,
      trailerUrl: "https://www.youtube.com/embed/2ilzidi_J8Q"
    },
    {
      id: 11,
      title: "The Silence of the Lambs",
      posterUrl: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
      releaseYear: 1991,
      director: "Jonathan Demme",
      plot: "FBI akademisi öğrencisi Clarice Starling, seri katil Buffalo Bill'i yakalamak için hapisteki bir başka seri katil Dr. Hannibal Lecter'dan yardım ister.",
      cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
      genre: ["Gerilim", "Suç", "Drama"],
      duration: 118,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/W6Mm8Sbe__o"
    },
    {
      id: 12,
      title: "The Green Mile",
      posterUrl: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
      releaseYear: 1999,
      director: "Frank Darabont",
      plot: "Ölüm koridorunda görevli Paul Edgecomb, doğaüstü güçlere sahip John Coffey adlı bir mahkumla tanışır ve hayatı değişir.",
      cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"],
      genre: ["Drama", "Fantastik", "Suç"],
      duration: 189,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/Ki4haFrqSrw"
    },
    {
      id: 13,
      title: "Interstellar",
      posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      releaseYear: 2014,
      director: "Christopher Nolan",
      plot: "Bir grup astronot, insanlığın geleceğini kurtarmak için solucan deliğinden geçerek galaksiler arası yolculuğa çıkar.",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      genre: ["Bilim Kurgu", "Drama", "Macera"],
      duration: 169,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
      id: 14,
      title: "Gladiator",
      posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      releaseYear: 2000,
      director: "Ridley Scott",
      plot: "Roma'nın en büyük generallerinden biri, yeni imparator tarafından ihanete uğrar ve köle olarak satılır. Gladyatör olarak arenada yükselerek intikamını almaya çalışır.",
      cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
      genre: ["Aksiyon", "Drama", "Tarih"],
      duration: 155,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/owK1qxDselE"
    },
    {
      id: 15,
      title: "The Departed",
      posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
      releaseYear: 2006,
      director: "Martin Scorsese",
      plot: "Boston polis teşkilatına sızan bir mafya üyesi ve mafyaya sızan bir polis memurunun yolları kesişir.",
      cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson", "Mark Wahlberg"],
      genre: ["Suç", "Drama", "Gerilim"],
      duration: 151,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/iojhqm0JTW4"
    },
    {
      id: 16,
      title: "Back to the Future",
      posterUrl: "https://image.tmdb.org/t/p/w500/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg",
      releaseYear: 1985,
      director: "Robert Zemeckis",
      plot: "Genç Marty McFly, çılgın bilim adamı Dr. Brown'ın zaman makinesi olan DeLorean ile kazara 1955 yılına gider ve ebeveynlerinin ilk tanışmasına şahit olur.",
      cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"],
      genre: ["Bilim Kurgu", "Macera", "Komedi"],
      duration: 116,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/qvsgGtivCgs"
    },
    {
      id: 17,
      title: "The Godfather: Part II",
      posterUrl: "https://i.ebayimg.com/images/g/EA4AAOSwMRhj8lqU/s-l1600.webp",
      releaseYear: 1974,
      director: "Francis Ford Coppola",
      plot: "Michael Corleone, babasının yerini alarak ailenin başına geçer. Bir yandan da genç Vito Corleone'nin geçmişini ve mafya dünyasındaki yükselişini izleriz.",
      cast: ["Al Pacino", "Robert Duvall", "Robert De Niro"],
      genre: ["Suç", "Drama"],
      duration: 202,
      rating: 9.0,
      trailerUrl: "https://www.youtube.com/embed/9O1Iy9od7-A"
    },
    {
      id: 18,
      title: "Saving Private Ryan",
      posterUrl: "https://i.ebayimg.com/images/g/M7YAAOSwpDdVW9N~/s-l1600.webp",
      releaseYear: 1998,
      director: "Steven Spielberg",
      plot: "II. Dünya Savaşı sırasında bir grup asker, üç oğlunu savaşta kaybeden bir annenin son oğlunu kurtarmak için tehlikeli bir göreve çıkar.",
      cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
      genre: ["Savaş", "Drama", "Aksiyon"],
      duration: 169,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/9CiW_DgxCnQ"
    },
    {
      id: 19,
      title: "Jurassic Park",
      posterUrl: "https://image.tmdb.org/t/p/w500/9i3plLl89DHMz7mahksDaAo7HIS.jpg",
      releaseYear: 1993,
      director: "Steven Spielberg",
      plot: "Milyarder John Hammond, DNA teknolojisiyle dinozorları yeniden canlandırır ve bir tema parkı kurar. Ancak işler kontrolden çıkar.",
      cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
      genre: ["Macera", "Bilim Kurgu", "Aksiyon"],
      duration: 127,
      rating: 8.1,
      trailerUrl: "https://www.youtube.com/embed/QWBKEmWWL38"
    },
    {
      id: 20,
      title: "The Lion King",
      posterUrl: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
      releaseYear: 1994,
      director: "Roger Allers, Rob Minkoff",
      plot: "Genç aslan Simba, babasının ölümünden sonra sürgüne gider. Yıllar sonra krallığını geri almak için dönmek zorunda kalır.",
      cast: ["Matthew Broderick", "James Earl Jones", "Jeremy Irons"],
      genre: ["Animasyon", "Macera", "Drama"],
      duration: 88,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/4sj1MT05lAA"
    },
    {
      id: 21,
      title: "Alien",
      posterUrl: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
      releaseYear: 1979,
      director: "Ridley Scott",
      plot: "Uzay gemisi Nostromo'nun mürettebatı, bilinmeyen bir gezegende karşılaştıkları uzaylı yaşam formuyla ölümcül bir mücadeleye girer.",
      cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
      genre: ["Bilim Kurgu", "Korku"],
      duration: 117,
      rating: 8.4,
      trailerUrl: "https://www.youtube.com/embed/LjLamj-b0I8"
    },
    {
      id: 22,
      title: "The Pianist",
      posterUrl: "https://image.tmdb.org/t/p/w500/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg",
      releaseYear: 2002,
      director: "Roman Polanski",
      plot: "Yahudi piyanist Władysław Szpilman'ın II. Dünya Savaşı sırasında Varşova'da hayatta kalma mücadelesi.",
      cast: ["Adrien Brody", "Thomas Kretschmann", "Frank Finlay"],
      genre: ["Biyografi", "Drama", "Savaş"],
      duration: 150,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/BFwGqLa_oAo"
    },
    {
      id: 23,
      title: "The Shining",
      posterUrl: "https://image.tmdb.org/t/p/w500/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg",
      releaseYear: 1980,
      director: "Stanley Kubrick",
      plot: "Kış sezonunda ıssız bir otelde bekçilik yapan Jack Torrance ve ailesi, doğaüstü olaylarla karşılaşır ve Jack'in akıl sağlığı yavaş yavaş bozulmaya başlar.",
      cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
      genre: ["Korku", "Gerilim"],
      duration: 146,
      rating: 8.4,
      trailerUrl: "https://www.youtube.com/embed/5Cb3ik6zP2I"
    },
    {
      id: 24,
      title: "Amélie",
      posterUrl: "https://i.ebayimg.com/images/g/JksAAOSwLUZnVqsI/s-l1600.webp",
      releaseYear: 2001,
      director: "Jean-Pierre Jeunet",
      plot: "Hayalperest bir Parisli garson kız, başkalarının hayatlarını gizlice iyileştirmeye çalışırken kendi aşkını bulur.",
      cast: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"],
      genre: ["Romantik", "Komedi"],
      duration: 122,
      rating: 8.3,
      trailerUrl: "https://www.youtube.com/embed/HUECWi5pX7o"
    },
    {
      id: 25,
      title: "Seven Samurai",
      posterUrl: "https://image.tmdb.org/t/p/w500/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg",
      releaseYear: 1954,
      director: "Akira Kurosawa",
      plot: "16. yüzyıl Japonya'sında, köylüler eşkıyalara karşı köylerini korumak için yedi samuray kiralar.",
      cast: ["Toshiro Mifune", "Takashi Shimura", "Keiko Tsushima"],
      genre: ["Aksiyon", "Drama", "Macera"],
      duration: 207,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/wJ1TOratCTo"
    },
    {
      id: 26,
      title: "Whiplash",
      posterUrl: "https://image.tmdb.org/t/p/w500/6uSPcdGNA2A6vJmCagXkvnutegs.jpg",
      releaseYear: 2014,
      director: "Damien Chazelle",
      plot: "Genç bir caz davulcusu, acımasız bir müzik öğretmeninin sınırlarını zorlayan eğitim metodlarıyla karşı karşıya kalır.",
      cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"],
      genre: ["Drama", "Müzik"],
      duration: 107,
      rating: 8.5,
      trailerUrl: "https://www.youtube.com/embed/7d_jQycdQGo"
    },
    {
      id: 27,
      title: "Eternal Sunshine of the Spotless Mind",
      posterUrl: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
      releaseYear: 2004,
      director: "Michel Gondry",
      plot: "Ayrılan bir çift, birbirlerini unutmak için hafızalarını sildirmeye karar verir, ancak Joel işlem sırasında fikrini değiştirir.",
      cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst"],
      genre: ["Romantik", "Bilim Kurgu", "Drama"],
      duration: 108,
      rating: 8.3,
      trailerUrl: "https://www.youtube.com/embed/07-QBnEkgXU"
    },
    {
      id: 28,
      title: "Spirited Away",
      posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      releaseYear: 2001,
      director: "Hayao Miyazaki",
      plot: "10 yaşındaki Chihiro, ailesiyle taşınırken gizemli bir tünelden geçer ve kendini büyülü bir dünyada bulur. Şimdi ailesini kurtarmak için çalışmak zorundadır.",
      cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
      genre: ["Animasyon", "Fantastik", "Macera"],
      duration: 125,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk"
    },
    {
      id: 29,
      title: "The Grand Budapest Hotel",
      posterUrl: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
      releaseYear: 2014,
      director: "Wes Anderson",
      plot: "Ünlü bir Avrupa otelinin efsanevi concierge'i Gustave H. ve lobi görevlisi Zero Moustafa arasındaki dostluğu anlatan komik ve dramatik hikaye.",
      cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"],
      genre: ["Komedi", "Drama", "Macera"],
      duration: 99,
      rating: 8.1,
      trailerUrl: "https://www.youtube.com/embed/1Fg5iWmQjwk"
    },
    {
      id: 30,
      title: "Oldboy",
      posterUrl: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg",
      releaseYear: 2003,
      director: "Park Chan-wook",
      plot: "15 yıl boyunca kapalı tutulduğu yerden aniden serbest bırakılan bir adam, kendisini hapseden kişiyi bulmak ve intikam almak için yola çıkar.",
      cast: ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"],
      genre: ["Gerilim", "Gizem", "Aksiyon"],
      duration: 120,
      rating: 8.4,
      trailerUrl: "https://www.youtube.com/embed/2HkjrJ6IK5E"
    },
    {
      id: 31,
      title: "Parasite",
      posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      releaseYear: 2019,
      director: "Bong Joon-ho",
      plot: "Yoksul Kim ailesi, zengin Park ailesinin hayatına sinsice sızar. Ancak beklenmedik olaylar, her iki aileyi de derinden etkileyecektir.",
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
      genre: ["Drama", "Gerilim", "Komedi"],
      duration: 132,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY"
    },
    {
      id: 32,
      title: "La La Land",
      posterUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      releaseYear: 2016,
      director: "Damien Chazelle",
      plot: "Los Angeles'ta yaşayan bir caz piyanisti ve gelecek vadeden bir oyuncu, hayallerini gerçekleştirmeye çalışırken birbirlerine aşık olurlar.",
      cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
      genre: ["Müzikal", "Romantik", "Drama"],
      duration: 128,
      rating: 8.0,
      trailerUrl: "https://www.youtube.com/embed/0pdqf4P9MB8"
    },
    {
      id: 33,
      title: "The Thing",
      posterUrl: "https://image.tmdb.org/t/p/w500/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
      releaseYear: 1982,
      director: "John Carpenter",
      plot: "Antarktika'daki bir araştırma istasyonunda, şekil değiştiren uzaylı bir yaratık ekibi tehdit etmeye başlar.",
      cast: ["Kurt Russell", "Wilford Brimley", "Keith David"],
      genre: ["Korku", "Bilim Kurgu", "Gerilim"],
      duration: 109,
      rating: 8.2,
      trailerUrl: "https://www.youtube.com/embed/5ftmr17M-a4"
    },
    {
      id: 34,
      title: "City of God",
      posterUrl: "https://image.tmdb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
      releaseYear: 2002,
      director: "Fernando Meirelles",
      plot: "Rio de Janeiro'nun fakir mahallelerinde büyüyen iki gencin yolları ayrılır; biri fotoğrafçı olmaya çalışırken diğeri organize suça bulaşır.",
      cast: ["Alexandre Rodrigues", "Leandro Firmino", "Phellipe Haagensen"],
      genre: ["Suç", "Drama"],
      duration: 130,
      rating: 8.6,
      trailerUrl: "https://www.youtube.com/embed/dcUOO4Itgmw"
    },
    {
      id: 35,
      title: "The Matrix Revolutions",
      posterUrl: "https://i.ebayimg.com/images/g/AxQAAOSwXHhdihuo/s-l1600.webp",
      releaseYear: 2003,
      director: "Lana WachowskiLilly Wachowski",
      plot: "İnsan şehri Zion, makinelerin devasa istilasına karşı kendini savunurken Neo, bir yandan savaşı başka bir cephede bitirmek için savaşırken, bir yandan da haydut Ajan Smith'e karşı çıkıyor.",
      cast: ["Keanu ReevesLaurence FishburneCarrie-Anne Moss"],
      genre: ["Bilim Kurgu", "Aksiyon"],
      duration: 118,
      rating: 6.7,
      trailerUrl: "https://www.imdb.com/video/vi2885026073/?playlistId=tt0242653&ref_=tt_ov_ov_vi"
    }
  ], []);

  // Tüm benzersiz türleri al
  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    genres.add('Tümü')
    movies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g))
    })
    return Array.from(genres)
  }, [movies]);

  // Filmleri filtrele ve sırala
  const filteredMovies = useMemo(() => {
    let filtered = movies;
    
    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tür filtresi
    if (selectedGenre !== 'Tümü') {
      filtered = filtered.filter(movie => 
        movie.genre.includes(selectedGenre)
      );
    }

    // Görünüm filtresi
    if (view === 'favorites') {
      filtered = filtered.filter(movie => favorites.includes(movie.id));
    } else if (view === 'watchlist') {
      filtered = filtered.filter(movie => watchlist.includes(movie.id));
    }

    // Sıralama
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.releaseYear - a.releaseYear;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, searchTerm, selectedGenre, view, favorites, watchlist, sortBy]);

  // Favori ekleme/çıkarma fonksiyonu
  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleWatchlist = (movieId: number) => {
    setWatchlist(prev => {
      const newWatchlist = prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId];
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  };

  // Film puanlama fonksiyonu
  const handleRateMovie = (movieId: number, rating: number) => {
    setUserRatings(prev => {
      const newRatings = {
        ...prev,
        [movieId]: rating
      };
      localStorage.setItem('userRatings', JSON.stringify(newRatings));
      return newRatings;
    });
  };

  // Yorum ekleme fonksiyonu
  const handleAddComment = (movieId: number, comment: string) => {
    if (!comment.trim()) return; // Boş yorumları engelle
    
    setComments(prev => {
      const newComments = {
        ...prev,
        [movieId]: [...(prev[movieId] || []), comment]
      };
      localStorage.setItem('comments', JSON.stringify(newComments));
      return newComments;
    });
  };

  // Dark mode toggle fonksiyonu
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Dark mode class'ını body'e ekle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Son izlenen filmler
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  // Film seçildiğinde son izlenenlere ekle
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Son izlenenlere ekleme fonksiyonu
  const handleAddToRecent = (movieId: number) => {
    setRecentlyViewed((prev: number[]) => {
      const filtered = prev.filter(id => id !== movieId); // Duplicate'leri kaldır
      const newRecent = [movieId, ...filtered].slice(0, 10); // Son 10 filmi tut
      localStorage.setItem('recentlyViewed', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  // Son izlenen filmlerden çıkarma fonksiyonu
  const removeFromRecentlyViewed = (movieId: number) => {
    setRecentlyViewed((prev: number[]) => {
      const newRecent = prev.filter(id => id !== movieId);
      localStorage.setItem('recentlyViewed', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>Film Dünyası</h1>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Film veya yönetmen ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-select"
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
            className="sort-select"
          >
            <option value="rating">Puana Göre Sırala</option>
            <option value="year">Yıla Göre Sırala</option>
            <option value="title">İsme Göre Sırala</option>
          </select>
          
          <select
            value={view}
            onChange={(e) => setView(e.target.value as 'all' | 'favorites' | 'watchlist')}
            className="view-select"
          >
            <option value="all">Tüm Filmler</option>
            <option value="favorites">Favoriler</option>
            <option value="watchlist">İzleme Listesi</option>
          </select>
        </div>

        {/* Dark Mode Toggle Button */}
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      {/* Son İzlenen Filmler Bölümü */}
      {recentlyViewed.length > 0 && (
        <section className="recently-viewed">
          <h2>Son İzlenen Filmler</h2>
          <div className="recent-movies">
            {recentlyViewed.map(movieId => {
              const movie = movies.find(m => m.id === movieId);
              if (!movie) return null;
              return (
                <div 
                  key={movie.id} 
                  className="recent-movie"
                >
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="recent-movie-poster"
                    onClick={() => handleMovieSelect(movie)}
                  />
                  <span className="recent-movie-title">{movie.title}</span>
                  <button
                    className="remove-recent"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromRecentlyViewed(movie.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <main className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieSelect}
              isFavorite={favorites.includes(movie.id)}
              onFavoriteClick={toggleFavorite}
            />
          ))
        ) : (
          <p className="no-results">Aradığınız kriterlere uygun film bulunamadı.</p>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={favorites.includes(selectedMovie.id)}
          onFavoriteClick={toggleFavorite}
          inWatchlist={watchlist.includes(selectedMovie.id)}
          onWatchlistClick={toggleWatchlist}
          userRating={userRatings[selectedMovie.id]}
          onRate={handleRateMovie}
          comments={comments[selectedMovie.id] || []}
          onAddComment={handleAddComment}
          onAddToRecent={handleAddToRecent}
          isInRecentlyViewed={recentlyViewed.includes(selectedMovie.id)}
        />
      )}
    </div>
  )
}

export default App
