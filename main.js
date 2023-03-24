const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Player';

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextButton = $('.btn-next');
const prevButton = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatButton = $('.btn-repeat');
const playList = $('.playlist');





const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [{
            id: 1,
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

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            const isActive = index === this.currentIndex;
            const activeClass = isActive ? 'active' : '';
            return `
                <div class="song ${activeClass}" data-index="${index}">
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


        playList.innerHTML = htmls.join('');
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

        // xử lí CD quay/ dừng

        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí phóng to/ thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;


        }

        // Xử lí khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi bài hát được bật

        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        // Khi bài hát bị pause

        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        // Khi tiến độ bài hát thay đổi

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        };

        // Xử lí khi tua bài hát
        progress.onchange = function(e) {
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
        };

        // Xử lí khi next bài hát
        nextButton.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.next();
            }
            audio.play();
            _this.scrollToActiveSong();
        };

        // xử lí khi prev bài hát
        prevButton.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prev();
            }
            audio.play();
            _this.scrollToActiveSong();
        };

        // xử lí khi bấm random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle("active");
        };

        // xử lí khi kết thúc bài hát
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextButton.click();
            }
        };

        // xử lí repeat bài hát
        repeatButton.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatButton.classList.toggle("active");

        };

        // lắng nghe hành vi click vào playlist

        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {

                // xử lí khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // xử lí khi click vào option
                if (e.target.closest('.option')) {

                }


            }
        };
    },

    scrollToActiveSong: function() {
        setTimeout( () => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 200);
    },

    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path;

    },

    updateActiveSong: function() {
        // const playList = $('.playlist');
        playList.querySelectorAll('.song').forEach(song => {
            song.classList.remove('active');
        });
        const currentSong = playList.querySelector(`.song:nth-child(${this.currentIndex + 1})`);
        if (currentSong) {
            currentSong.classList.add('active');
        }
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    next: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.updateActiveSong();
    },

    prev: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.updateActiveSong();
    },

    playRandomSong: function() { // tạo bài hát ngẫu nhiên
        let randomSongs = []; // tạo mảng cho các bài hát ngẫu nhiên
        let randomIndexCount = 0; // biến đếm số lần lặp
        let newIndex; // giá trị ngẫu nhiên tương ứng với bài hát

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);

            if (!randomSongs.includes(newIndex)) { // kiểm tra xem có newIndex có bị trùng hay không,
                randomSongs.push(newIndex); // nếu không trùng thêm newIndex vào cuối mảng
                randomIndexCount++;
                console.log(newIndex, randomSongs)
            }

            if (randomIndexCount === this.songs.length) { // nếu số lần lặp bằng với số lượng bài hát thì reset
                randomIndexCount = 0;
                randomSongs = [];
            }
        } while (newIndex === this.currentIndex || randomIndexCount === 0);  // vòng lặp kiểm tra xem giá trị ngẫu nhiên không trùng với bài hát hiện tại


        this.currentIndex = newIndex;  // current index: index của bài hát hiện tại
        this.loadCurrentSong();
        this.updateActiveSong();
        // do {
        //     newIndex = Math.floor(Math.random() * this.songs.length); // ngẫu nhiên các bài hát
        //     randomSongs.push(newIndex); // đưa bài hát ngẫu nhiên vào mảng randomSongs
        // } while (newIndex === this.currentIndex);

        // if (randomSongs.length === this.songs.length) {
        //     randomSongs = []; // khi mảng chứa hết tất cả bài hát thì reset
        // }

        // // while (newIndex === this.currentIndex);
    },

    start: function() {

        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // lắng nghe/ xử lí sự kiện
        this.handleEvents();

        // tải thông tin bài hát đầu tiên vào UI khi chạy trình duyệt
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatButton.classList.toggle('active', this.isRepeat);
    }
}

app.start();