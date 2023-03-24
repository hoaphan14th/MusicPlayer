const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    currentIndex: 0,
    songs: [
        {
            name: 'Cuối Cùng Thì',
            singer: 'J97',
            path: './assets/music/Z6UD089Z.320.zmp3',
            image: './assets/img/CuoiCungThi.jpg'
        },
        {
            name: 'Khuất Lối',
            singer: 'H-KRay',
            path: './assets/music/Z6Z0B7I0.320.zmp3',
            image: './assets/img/KhuatLoi.jpg'
        },
        {
            name: 'Kỳ Vọng Sai Lầm',
            singer: 'Tăng Phúc, Nguyễn Đình Vũ',
            path: './assets/music/Z6I77FCW.320.zmp3',
            image: './assets/img/KyVongSaiLam.jpg'
        },
        {
            name: 'Hồng Nhan',
            singer: 'Jack, K-ICM',
            path: './assets/music/ZWABIIDC.320.zmp3',
            image: './assets/img/HongNhan.jpg'
        },
        {
            name: 'Tòng Phu',
            singer: 'KeyO',
            path: './assets/music/ZZFDIEB6.320.zmp3',
            image: './assets/img/TongPhu.jpg'
        },
        {
            name: 'Có Chơi Có Chịu',
            singer: 'Karik',
            path: './assets/music/Z6I760F9.320.zmp3',
            image: './assets/img/CoChoiCoChiu.jpeg'
        }
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });

        $('.playlist').innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function() {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;


        }
    },

    loadCurrentSong: function () {

    },

    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nghe/ xử lí sự kiện
        this.handleEvents();

        // tải thông tin bài hát đầu tiên vào UI khi chạy trình duyệt
        this.loadCurrentSong();


        // Render playlist
        this.render();
    }
}

app.start();