// 获取当前窗口大小，用于适配手机屏幕
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

// Phaser 游戏配置
const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#f5f5dc",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,          // 等比缩放适配
    autoCenter: Phaser.Scale.CENTER_BOTH // 居中
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;

// 创建游戏实例
const game = new Phaser.Game(config);

function preload() {}

function create() {
  const scene = this;

  // 地板放在底部
  const groundHeight = 40;
  const ground = scene.add.rectangle(
    GAME_WIDTH / 2,
    GAME_HEIGHT - groundHeight / 2,
    GAME_WIDTH,
    groundHeight,
    0x8b4513
  );
  scene.physics.add.existing(ground, true);

  // 主方块放在上方中间
  player = scene.add.rectangle(
    GAME_WIDTH / 2,
    GAME_HEIGHT * 0.2,
    60,
    60,
    0xffcc00
  );
  scene.physics.add.existing(player);

  scene.physics.add.collider(player, ground);

  // 点击或触摸屏幕，掉一个方块
  scene.input.on("pointerdown", (pointer) => {
    const box = scene.add.rectangle(pointer.x, 0, 40, 40, 0x3498db);
    scene.physics.add.existing(box);
    scene.physics.add.collider(box, ground);
    scene.physics.add.collider(box, player);
  });
}

function update() {}
