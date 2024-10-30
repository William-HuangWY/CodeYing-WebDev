const { createApp, ref, computed  } = Vue;
const{ createRouter, createWebHistory, createWebHashHistory} = VueRouter;

// Components

// (Start Component)
const Start = { 
  template: `
    <div class="container">
      <h1>Sliding Puzzle🧩</h1>
      <button @click="goToMenu">Start Game</button>
      <button @click="clearRecords" class="clear-button">Clear Records</button>
    </div>
  `,
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    },
    clearRecords() {
      localStorage.removeItem('maxLevel');
      localStorage.removeItem('logCurrentDateTime');
      alert('Records cleared!');
    },
    logCurrentDateTime() {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const logMessage = `
        🎉🎂 Happy Birthday! 🎂🎉
        
        Wishing you a day filled with joy! 🥳✨
        May all your dreams and wishes come true! 🎈🎁

        Have the best birthday ever! 🥳🎉🎂
      `;
      if (month === 9 && day === 30 && !localStorage.getItem('logCurrentDateTime')) alert(logMessage);
      localStorage.setItem('logCurrentDateTime', true);
    },
  },
  mounted() {
    this.logCurrentDateTime();
   }
};

// (PuzzleMenu Component)
const PuzzleMenu = {
  template: `
    <div class="container">
      <h1 style="color: #f9dc1f">Select Level</h1>
      <div class="level-buttons">
        <button
          v-for="(level, index) in levels"
          :key="index"
          @click="goToGame(level)"
          class="level-button"
          :disabled="!isLevelAccessible(index)"
        >
          Level {{ index + 1 }}
        </button>
      </div>
      <div class="button-container">
        <button @click="goToStart" class="back-button">Back to Start</button>
      </div>
    </div>
  `,
  data() {
    return {
      levels: [],
      baseImagePath: 'https://weiyinghuang.com/static/img/game/sliding-puzzle/'
    };
  },
  created() {
    this.loadLevels();
    this.initializeLevels();
  },
  methods: {
    loadLevels() {
      this.levels = [
        [`${this.baseImagePath}level1.png`, 3, 3, 1], // img/row/col/level
        [`${this.baseImagePath}level2.png`, 4, 4, 2],
        [`${this.baseImagePath}level3.png`, 5, 5, 3],
      ];
    },
    initializeLevels() {
      if (!localStorage.getItem('maxLevel')) {
        localStorage.setItem('maxLevel', 0);
      }
    },
    goToGame(level) {
      const [imageSrc, rows, cols, levelVal] = level;
      this.$router.push({
        path: '/game',
        query: {
          imageSrc: imageSrc,
          level: levelVal,
          rows: rows,
          cols: cols
        }
      });
    },
    isLevelAccessible(index) {
      const maxLevel = parseInt(localStorage.getItem('maxLevel'), 10);
      console.log(maxLevel);
      return index <= maxLevel;
    },
    goToStart() {
      this.$router.push('/');
    },
  }
};


// (SliderPuzzleGame Component)
const SliderPuzzleGame = {
    template: `
    <div class="level-title">
      <h3>Level {{ this.level }}</h3>
    </div>
    <div class="game-container">
      <div class="puzzle-frame" 
          v-if="!isCompleted" 
          :style="{ 
            gridTemplateColumns: 'repeat(' + cols + ', 1fr)', 
            gridTemplateRows: 'repeat(' + rows + ', 1fr)' 
          }">
        <div class="puzzle-piece" 
            v-for="(piece, index) in pieces" 
            :style="getImageUrl(index)" 
            @click="moveCell(index)">
        </div>
      </div>
      <div v-else>
        <h2> &nbsp; Congratulations! You completed the Level! &nbsp;</h2>
        <button @click="downloadImage">⬇️</button>
      </div>
    </div>
    <div class="button-container">
      <button @click="goToMenu">Back to Menu</button>
    </div>
  `,
  data() {
    return {
      imageSrc: '',
      level: -1,
      rows: -1,
      cols: -1,
      pieces: [],
      cells: [],
      isCompleted: false
    };
  },
  mounted() {
    this.imageSrc = this.$route.query.imageSrc;
    this.level = parseInt(this.$route.query.level);
    this.rows = parseInt(this.$route.query.rows);
    this.cols = parseInt(this.$route.query.cols);
    this.loadImage();
  },
  methods: {
    loadImage() {
      const img = new Image();
      img.src = this.imageSrc;
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        const pieceWidth = Math.floor(width / this.cols);
        const pieceHeight = Math.floor(height / this.rows);

        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.cols; col++) {
            const piece = {
              x: col * pieceWidth,
              y: row * pieceHeight,
              width: pieceWidth,
              height: pieceHeight,
              index: row * this.cols + col
            };
            this.pieces.push(piece);
          }
        }

        this.shufflePuzzle();
      };
    },
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.imageSrc;
      link.download = `sliding-puzzle-level${this.level}.png`;
      link.click();
    },
    createPuzzle(size) {
      const numbers = [...Array(size * size).keys()];
      numbers[numbers.length - 1] = null;
      return this.shuffle(numbers);
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    moveCell(index) {
      const emptyIndex = this.cells.indexOf(null);
      if (this.canMove(index, emptyIndex)) {
        [this.cells[index], this.cells[emptyIndex]] = [this.cells[emptyIndex], this.cells[index]];
        this.checkCompletion();
      }
    },
    canMove(index, emptyIndex) {
      const row = Math.floor(index / this.cols);
      const col = index % this.cols;
      const emptyRow = Math.floor(emptyIndex / this.cols);
      const emptyCol = emptyIndex % this.cols;
      return (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1);
    },
    shufflePuzzle() {
      this.cells = this.createPuzzle(this.rows);
      this.isCompleted = false;
    },
    checkCompletion() {
      const correctOrder = [...Array(this.rows * this.cols).keys()];
      this.isCompleted = this.cells.every((cell, index) => cell === correctOrder[index] || cell === null);
      if (this.isCompleted) {
        this.updateMaxLevel();
      }
    },
    updateMaxLevel() {
      const newMaxLevel = Math.max(parseInt(localStorage.getItem('maxLevel'), 10) || 0, this.level);
      localStorage.setItem('maxLevel', newMaxLevel);
    },
    getImageUrl(index) {
      const pieceIndex = this.cells[index];
      if (pieceIndex === null || pieceIndex === undefined) {
        return {};
      }

      const piece = this.pieces[pieceIndex];
      if (!piece) {
        return {};
      }

      return {
        backgroundImage: `url(${this.imageSrc})`,
        backgroundPosition: `-${piece.x}px -${piece.y}px`,
        backgroundSize: `${this.cols * piece.width}px ${this.rows * piece.height}px`,
        width: `${piece.width}px`,
        height: `${piece.height}px`
      };
    },
    goToMenu() {
      this.$router.push('/menu');
    },
  },
};

// Routes
const routes = [
  { path: '/', component: Start },
  { path: '/menu', component: PuzzleMenu },
  { path: '/game', component: SliderPuzzleGame }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// App
const app = createApp({});
app.component('start', Start);
app.component('puzzlemenu', PuzzleMenu);
app.component('sliderpuzzle', SliderPuzzleGame);
app.use(router);
app.mount('#app');
