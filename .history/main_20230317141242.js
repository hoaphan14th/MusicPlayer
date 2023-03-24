const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
console.log([audio])




const app = {

    currentIndex: 0,
    isPlaying: false,
    songs: [{
            name: 'Cuối Cùng Thì',
            singer: 'J97',
            path: './assets/music/jack_j97_cuoi_cung_thi_special_stage_video_8930834444110203496.mp3',
            image: './assets/img/CuoiCungThi.jpg'
        },
        {
            name: 'Khuất Lối',
            singer: 'H-KRay',
            path: './assets/music/khuat_loi_h_kray_official_lyrics_video_4534792928792109613.mp3',
            image: './assets/img/KhuatLoi.jpg'
        },
        {
            name: 'Kỳ Vọng Sai Lầm',
            singer: 'Tăng Phúc, Nguyễn Đình Vũ',
            path: './assets/music/official_mv_ky_vong_sai_lam_nguyen_dinh_vu_x_tang_phuc_x_yuno_bigboi_-2236660024621333380.mp3',
            image: './assets/img/KyVongSaiLam.jpg'
        },
        {
            name: 'Hồng Nhan',
            singer: 'Jack, K-ICM',
            path: './assets/music/hong_nhan_jack_g5r_k_icm_remix_-6988270874765471417.mp3',
            image: './assets/img/HongNhan.jpg'
        },
        {
            name: 'Tòng Phu',
            singer: 'KeyO',
            path: './assets/music/keyo_tong_phu_official_music_video_qua_kho_de_cham_lo_mot_nguoi_con_gai_-6859786942275495199.mp3',
            image: './assets/img/TongPhu.jpg'
        },
        {
            name: 'Có Chơi Có Chịu',
            singer: 'Karik',
            path: './assets/music/karik_x_only_c_co_choi_co_chiu_official_music_video_-8051467622003106677.mp3',
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
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function() {

        const _this = this;

        const cdWidth = cd.offsetWidth;

        // Xử lí phóng to/ thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;


        }

        // Xử lí khi click play
        playBtn.onclick = function() {

            audio.play();
            player.classList.add('playing');
        }
    },



    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path;

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